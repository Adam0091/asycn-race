import { createAndAppendHtmlElement } from "../../typescript/add-element-function";
import { sendRequest } from "../../typescript/sendRequest";
import { Machine } from "../machine/machine";
import * as ConstURL from "../const/constURL";
import * as ConstText from "../const/const";

export class Garage {
    private garage:HTMLElement;
    private number_page:number = 1;
    private garage__title:HTMLElement;
    private ok:boolean = false;
    private arr_machine:Array<Machine> = [];
    private garage__list: HTMLElement;
    
    public init():HTMLElement {
        this.garage = document.createElement("div");
        this.garage.classList.add("garage")
        this.drawTitle();
        this.getCarsServer().then((resolve) => {
            this.ok = true;
            this.drawListMachines(resolve);
        });
        return this.garage;
    }

    private async getCarsServer() {
        const cars = await sendRequest('GET', ConstURL.garageURL);
        return await Promise.resolve(cars);
    }
    private drawTitle():void {
        this.garage__title = createAndAppendHtmlElement(this.garage, "h2", "garage__title", `${ ConstText.garage__title } (${ 0 }) ` );
        createAndAppendHtmlElement(this.garage, "h3", "garage__page", `${ ConstText.garage__page } (${ this.number_page }) ` );
    }
    private drawListMachines(cars:Array<{id:number,name:string,color:string}>) {
        this.garage__list = createAndAppendHtmlElement(this.garage, "div", "garage__list");

        document.querySelector(".garage__title").innerHTML = `${ ConstText.garage__title } (${ cars.length }) `;
        for ( let i = 0; i < cars.length; i++ ) {
            const garage__item = createAndAppendHtmlElement(this.garage__list, "div", "garage__item");
            const MACHINE = new Machine(cars[i].id, cars[i].name, cars[i].color);
            garage__item.appendChild( MACHINE.init() );
            this.arr_machine.push( MACHINE );
        }
    }

    public update() {
        this.ok = false;
        setTimeout(()=>{
            this.getCarsServer().then((cars) => {
                this.drawListMachines(cars);
    
                const garage__list = document.querySelector(".garage__list");
                garage__list.innerHTML = "";
                garage__list.appendChild(this.garage__list)
                this.ok = true;
            });
        },100)
    }
    public get OK() : boolean {
        return this.ok;
    }
    public get arrMachine() : Array<Machine> {
        return this.arr_machine;
    }
    
}