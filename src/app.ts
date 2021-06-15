import { Header } from "./components/header/header";
import { ControlPanel } from "./components/controlPanel/controlPanel";
import { Garage } from "./components/garage/garage";

import * as header from "./components/header/headerEvent";
import * as control_panel from "./components/controlPanel/controlPanelEvent";
import * as car from "./components/machine/machineEvent";

export class App {
    private APP: HTMLElement;

    private HEADER: Header;
    private CONTROL_PANEL: ControlPanel;
    private GARAGE: Garage;
    private selectCar: number = 1;

    constructor () {
        this.APP = document.createElement("div");
        this.APP.classList.add(".app");

        this.HEADER = new Header();
        this.CONTROL_PANEL = new ControlPanel();
        this.GARAGE = new Garage();
    }
    
    public init():HTMLElement {
        this.APP.appendChild( this.HEADER.init() );
        this.APP.appendChild( this.CONTROL_PANEL.init() );
        this.APP.appendChild( this.GARAGE.init() );

        this.eventListenerForHeader();
        this.eventListenerForControlPanel();
        this.eventListenerForGarage();

        return this.APP;
    }

    private eventListenerForHeader():void {
        this.HEADER.layout.addEventListener("click", () => {
            const target = event.target as HTMLElement;
            if(this.HEADER.buttons.garage_btn.contains(target))  header.drawGarage();
            if(this.HEADER.buttons.winners_btn.contains(target))  header.drawWinners();
        })
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
                control_panel.reset();
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
                this.GARAGE.backPage();
                this.GARAGE.update();
            }
            if(buttonNextPage.contains(target)){
                this.GARAGE.nextPage();
                this.GARAGE.update();
            }
        })
    }

    private eventListenerForMachine(machines: NodeListOf<Element>, target:HTMLElement){
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
                buttonStart.disabled = true;
                car.startEngine( Number(item.id),).then( (res:{velocity: number, distance: number})=>{
                    buttonStop.disabled = false;
                    const machine_svg = item.querySelector(".machine__svg") as HTMLElement;
                    machine_svg.style.animationPlayState = "running";
                    machine_svg.style.animationDuration = `${ (res.distance / res.velocity)/1000 }s`;
                    machine_svg.style.animationName = "anim";
                    let success = car.carSuccess( Number(item.id) )
                    success.then ( (success)=> {
                        console.log(success)
                    })
                    success.catch( ()=> {
                        const machine_svg = item.querySelector(".machine__svg") as HTMLElement;
                        machine_svg.style.animationPlayState = "paused";
                    })
                });

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
}

