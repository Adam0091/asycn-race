import { createAndAppendHtmlElement } from "../../typescript/add-element-function";
import { sendRequest } from "../../typescript/sendRequest";
import { Machine } from "../machine/machine";
import * as ConstURL from "../const/constURL";
import * as ConstText from "../const/const";

export class Garage {
    private garage:HTMLElement;
    private number_page:number = 1;
    private coutPage: number = 1;
    
    public init():HTMLElement {
        this.garage = document.createElement("div");
        this.garage.classList.add("garage")
        this.drawTitle();
        this.getCarsServer().then((resolve) => {
            this.drawListMachines(resolve);
            this.drawButtonsForPages()
        });
        return this.garage;
    }
    private drawTitle():void {
        createAndAppendHtmlElement(this.garage, "h2", "garage__title", `${ ConstText.garage__title } (${ 0 }) ` );
        createAndAppendHtmlElement(this.garage, "h3", "garage__page", `${ ConstText.garage__page } (${ this.number_page }) ` );
    }
    private async getCarsServer() {
        const cars = await sendRequest('GET', ConstURL.garageURL);
        return await Promise.resolve(cars);
    }
    private drawListMachines(cars:Array<{id:number,name:string,color:string}>):void {
        this.coutPage = Math.ceil( cars.length / 7 );

        const garage__list = createAndAppendHtmlElement(this.garage, "div", "garage__list");
        document.querySelector(".garage__title").innerHTML = `${ ConstText.garage__title } (${ cars.length }) `;

        const start = this.number_page === 1 ? 0 :  this.number_page * 7 - 1;
        const end = this.number_page * 7 >  cars.length ? cars.length : this.number_page * 7;

        for ( let i = start; i < end; i++ ) {
            const garage__item = createAndAppendHtmlElement(garage__list, "div", "garage__item");
            const MACHINE = new Machine(cars[i].id, cars[i].name, cars[i].color);
            garage__item.appendChild( MACHINE.init() );
        }
    }
    private drawButtonsForPages():void {
        const garage__buttons_for_pages = createAndAppendHtmlElement(this.garage, "div", "garage__buttons_for_pages");

        const buttons_for_pages__back = createAndAppendHtmlElement(garage__buttons_for_pages, "button", "buttons_for_pages__back", ConstText.btn_back) as HTMLButtonElement;
        buttons_for_pages__back.classList.add("button");
        if( this.number_page >  1)  buttons_for_pages__back.disabled = false;
        else buttons_for_pages__back.disabled = true;
        
        const buttons_for_pages__next = createAndAppendHtmlElement(garage__buttons_for_pages, "button", "buttons_for_pages__next", ConstText.btn_next) as HTMLButtonElement;
        buttons_for_pages__next.classList.add("button");
        if( this.number_page < this.coutPage)  buttons_for_pages__next.disabled = false;
        else buttons_for_pages__next.disabled = true;
    }
    public update():void {
        this.getCarsServer().then((cars) => {
            this.updateTitle(cars);
            this.updateGarageList(cars);
            this.updateButtonsForPages();
        });
    }
    private updateTitle(cars:Array<{id:number,name:string,color:string}>):void {
        document.querySelector(".garage__title").innerHTML = `${ ConstText.garage__title } (${ cars.length }) `;
        document.querySelector(".garage__page").innerHTML = `${ ConstText.garage__page } (${ this.number_page }) `;
    }
    private updateGarageList(cars:Array<{id:number,name:string,color:string}>):void {
        const garage__list = document.querySelector(".garage__list") as HTMLElement;
        garage__list.innerHTML = "";
        
        this.coutPage = Math.ceil( cars.length / 7 );
        
        const start = this.number_page === 1 ? 0 : ( (this.number_page - 1) * 7);
        const end = this.number_page * 7 >  cars.length ? cars.length : this.number_page * 7;

        for ( let i = start; i < end; i++ ) {
            const garage__item = createAndAppendHtmlElement(garage__list, "div", "garage__item");
            const MACHINE = new Machine(cars[i].id, cars[i].name, cars[i].color);
            garage__item.appendChild( MACHINE.init() );
        }

    }
    private updateButtonsForPages():void {
        const buttons_for_pages__back = document.querySelector(".buttons_for_pages__back") as HTMLButtonElement;
        const buttons_for_pages__next = document.querySelector(".buttons_for_pages__next") as HTMLButtonElement;

        if( this.number_page >  1)  buttons_for_pages__back.disabled = false;
        else buttons_for_pages__back.disabled = true;

        if( this.number_page < this.coutPage)  buttons_for_pages__next.disabled = false;
        else buttons_for_pages__next.disabled = true;
    }

    public get layout():HTMLElement {
        return this.garage;
    }
    public nextPage():void {
        this.number_page++;
    }
    public backPage():void {
        this.number_page--;
    }
}