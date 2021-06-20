import { Header } from "./components/header/header";
import { ControlPanel } from "./components/controlPanel/controlPanel";
import { Garage } from "./components/garage/garage";
import { Winners } from "./components/winners/winners";

import * as header from "./components/header/headerEvent";
import * as control_panel from "./components/controlPanel/controlPanelEvent";
import * as car from "./components/machine/machineEvent";

export class App {
    private APP: HTMLElement;

    private HEADER: Header;
    private CONTROL_PANEL: ControlPanel;
    private GARAGE: Garage;
    private WINNERS: Winners;
    private selectCar = 1;
    private wasWinner = false;

    constructor () {
        this.APP = document.createElement("div");
        this.APP.classList.add("app");

        this.HEADER = new Header();
        this.CONTROL_PANEL = new ControlPanel();
        this.GARAGE = new Garage();
        this.WINNERS = new Winners();
    }
    public init():HTMLElement {
        this.APP.appendChild( this.HEADER.init() );
        this.APP.appendChild( this.CONTROL_PANEL.init() );
        this.APP.appendChild( this.GARAGE.init() );
        this.WINNERS.init();

        this.eventListenerForHeader();
        this.eventListenerForControlPanel();
        this.eventListenerForGarage();
        this.eventListenerForWinners();

        return this.APP;
    }

    private eventListenerForHeader():void {
        this.HEADER.layout.addEventListener("click", () => {
            const target = event.target as HTMLElement;

            const buttonGarage = document.querySelector(".nav__garage_btn") as HTMLButtonElement;
            const buttonWinners = document.querySelector(".nav__winners_btn") as HTMLButtonElement;
            if(this.HEADER.buttons.garage_btn.contains(target)){
                buttonGarage.disabled = true;
                buttonWinners.disabled = false;
                document.querySelector(".winners").remove();
                header.drawGarage(this.CONTROL_PANEL.layout as HTMLElement, this.GARAGE.layout as HTMLElement);
            }  
            if(this.HEADER.buttons.winners_btn.contains(target)){
                buttonGarage.disabled = false;
                buttonWinners.disabled = true;
                document.querySelector(".control_panel").remove();
                document.querySelector(".garage").remove();
                header.drawWinners(this.WINNERS.layout);
            } 
        });
    }
    private eventListenerForControlPanel():void {
        this.CONTROL_PANEL.layout.addEventListener("click", () => {
            const target = event.target as HTMLElement;
            if(this.CONTROL_PANEL.buttons.create_car_input__btn.contains(target)){
                control_panel.createCar(
                    this.CONTROL_PANEL.getCreateCarName(),
                    this.CONTROL_PANEL.getCreateCarColor()
                );

                this.GARAGE.update();
            }
            if(this.CONTROL_PANEL.buttons.update_car_input__btn.contains(target)){
                control_panel.updateCar(
                    this.selectCar, 
                    this.CONTROL_PANEL.getUpdateCarName(),
                    this.CONTROL_PANEL.getUpdateCarColor()
                );
                const btn_update = document.querySelector(".update_car_input__btn") as HTMLButtonElement;
                this.selectCar = -1;
                btn_update.disabled = true;
                this.GARAGE.update();
            }
            if(this.CONTROL_PANEL.buttons.control_panel__btn_race.contains(target)){
                control_panel.startRace();
            }
            if(this.CONTROL_PANEL.buttons.control_panel__btn_reset.contains(target)){
                const winner_scoreboard = document.querySelector(".garage__winner") as HTMLElement;
                control_panel.reset();
                winner_scoreboard.innerHTML = ``;
                winner_scoreboard.style.visibility = "hidden";
            }
            if(this.CONTROL_PANEL.buttons.control_panel__btn_generate_cars.contains(target)){
                control_panel.generateCars();
                this.GARAGE.update();
            }
        })
    }
    private eventListenerForGarage():void {
        this.GARAGE.layout.addEventListener("click", () => {
            const target = event.target as HTMLElement; 

            const machines = document.querySelectorAll(".machine");
            this.eventListenerForMachine(machines, target);

            const buttonBackPage = document.querySelector(".buttons_for_pages__back") as HTMLButtonElement;
            const buttonNextPage = document.querySelector(".buttons_for_pages__next") as HTMLButtonElement;

            if(buttonBackPage.contains(target)){
                this.wasWinner = false;
                this.GARAGE.backPage();
                this.GARAGE.update();
            }
            if(buttonNextPage.contains(target)){
                this.wasWinner = false;
                this.GARAGE.nextPage();
                this.GARAGE.update();
            }
        })
    }
    private eventListenerForMachine(machines: NodeListOf<Element>, target:HTMLElement):void {
        machines.forEach( async (item) =>{
            const buttonSelect = item.querySelector(".machine__btn-select") as HTMLButtonElement;
            const buttonRemove = item.querySelector(".machine__btn-remove") as HTMLButtonElement;
            const buttonStart = item.querySelector(".control_btns__A") as HTMLButtonElement;
            const buttonStop = item.querySelector(".control_btns__B") as HTMLButtonElement;


            if(buttonSelect.contains(target)) {
                const btn_update = document.querySelector(".update_car_input__btn") as HTMLButtonElement;
                btn_update.disabled = false;
                console.log(item.id);
                this.selectCar = Number(item.id);
            }
            if(buttonRemove.contains(target)) {
                car.deleteCar( Number(item.id) );
                this.GARAGE.update();
                if(Number(item.id) === this.selectCar) {
                    this.selectCar = -1;
                    const btn_update = document.querySelector(".update_car_input__btn") as HTMLButtonElement;
                    btn_update.disabled = true;
                }
            }
            if(buttonStart.contains(target)) {
                this.wasWinner = false;
                buttonStart.disabled = true;
                const startEngine = car.startEngine( Number(item.id),)
                startEngine.then( (res:{velocity: number, distance: number})=>{
                    buttonStop.disabled = false;
                    const machine_svg = item.querySelector(".machine__svg") as HTMLElement;
                    machine_svg.style.animationPlayState = "running";
                    machine_svg.style.animationDuration = `${ (res.distance / res.velocity)/1000 }s`;
                    machine_svg.style.animationName = "anim";

                    const success = car.carSuccess( Number(item.id) )
                    success.then ( (success)=> {
                        if(success.success){
                            if(!this.wasWinner){
                                this.wasWinner = true;
                                const nameWinner = item.querySelector(".machine__name").innerHTML;
                                const timeWinner = Number( ((res.distance / res.velocity) / 1000 ).toFixed(2) );
                                car.sendWinner( Number(item.id), timeWinner);
                                console.log( nameWinner + " " + `${timeWinner}s` )
    
                                const winner_scoreboard = document.querySelector(".garage__winner") as HTMLElement;
                                winner_scoreboard.innerHTML = `${nameWinner} came first [${timeWinner}s]`;
                                winner_scoreboard.style.visibility = "visible";
                                this.WINNERS.update();
                            }
                        }
 
                    })
                    success.catch( ()=> {
                        const machine_svg = item.querySelector(".machine__svg") as HTMLElement;
                        machine_svg.style.animationPlayState = "paused";
                    })
                });
                startEngine.catch((ERR)=> {
                    console.log(ERR)
                })
            }
            if(buttonStop.contains(target)) {
                buttonStop.disabled = true;
                car.stopEngine( Number(item.id) ).then( ()=>{
                    buttonStart.disabled = false;
                    const machine_svg = item.querySelector(".machine__svg") as HTMLElement;
                    machine_svg.style.animationName = "none";
                })
            }
        })
    }
    private eventListenerForWinners():void {
        this.WINNERS.layout.addEventListener("click", () => {
            const target = event.target as HTMLElement;
            const btnBack = document.querySelector(".buttons_for_pages__back");
            const btnNext = document.querySelector(".buttons_for_pages__next");

            const btnWins= document.querySelector(".list_header__wins");
            const btnTime = document.querySelector(".list_header__best_time");

            if(btnBack.contains(target)) {
                this.WINNERS.backPage();
                this.WINNERS.update();
                document.querySelector(".winners").remove();
                header.drawWinners(this.WINNERS.layout);
            }
            if(btnNext.contains(target)) {
                this.WINNERS.nextPage();
                this.WINNERS.update();
                document.querySelector(".winners").remove();
                header.drawWinners(this.WINNERS.layout);
            }

        })
    }
}

