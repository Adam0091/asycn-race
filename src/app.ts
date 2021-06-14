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
    private selectCar: number = -1;

    constructor () {
        this.APP = document.createElement("div");
        this.APP.classList.add(".app");

        this.HEADER = new Header();
        this.CONTROL_PANEL = new ControlPanel();
        this.GARAGE = new Garage();
    }
    
    init():HTMLElement {
        this.APP.appendChild( this.HEADER.init() );
        this.APP.appendChild( this.CONTROL_PANEL.init() );
        this.APP.appendChild( this.GARAGE.init() );

        this.eventListenerForHeader();
        this.eventListenerForControlPanel();
        this.eventListenerForMachine(this.GARAGE);

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
                control_panel.createCar( this.CONTROL_PANEL.getCreateCarName(),
                                         this.CONTROL_PANEL.getCreateCarColor() );
                this.GARAGE.update();   
            }  
            if(this.CONTROL_PANEL.buttons.update_car_input__btn.contains(target)) {
                control_panel.updateCar( this.selectCar, 
                    this.CONTROL_PANEL.getUpdateCarName(),
                    this.CONTROL_PANEL.getUpdateCarColor() );
                this.GARAGE.update();
            }
                
            if(this.CONTROL_PANEL.buttons.control_panel__btn_race.contains(target))  control_panel.startRace();
            if(this.CONTROL_PANEL.buttons.control_panel__btn_reset.contains(target))  control_panel.reset();
            if(this.CONTROL_PANEL.buttons.control_panel__btn_generate_cars.contains(target))  control_panel.generateCars();
        })
    }
    private eventListenerForMachine(garage: Garage):void {
        if(!garage.OK){
            setTimeout(
               () => { this.eventListenerForMachine(garage) } , 
            200)
        }
        else {
            garage.arrMachine.forEach((machine, i, arr)=> {
                machine.layout.addEventListener("click", () => {
                    const target = event.target as HTMLElement;
    
                    if(machine.buttons.buttonRemove.contains(target)){
                        car.deleteCar(machine.ID);
                        //this.GARAGE.update();
                    }  
                    if(machine.buttons.buttonSelect.contains(target)){
                        this.selectCar = machine.ID;
                        const btnSelect =  document.querySelector(".update_car_input__btn") as HTMLButtonElement;
                        btnSelect.disabled = false;
                        console.log(this.selectCar)
                    }  
                    if(machine.buttons.control_btns__A.contains(target))  car.startEngine(machine.ID);
                    if(machine.buttons.control_btns__B.contains(target))  car.stopEngine(machine.ID);
                });
            })
        }
    }
}

///Кривой update сдулай sucs