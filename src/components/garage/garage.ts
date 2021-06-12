import { createAndAppendHtmlElement } from "../../typescript/add-element-function";
import { sendRequest } from "../../typescript/sendRequest";
import { Machine } from "../machine/machine";
import * as ConstURL from "../const/constURL";
import * as ConstText from "../const/const";

export class Garage {
    private garage:HTMLElement;
    private number_page:number = 1;
    private garage__title:HTMLElement;

    public init():HTMLElement {
        this.garage = document.createElement("div");
        this.garage.classList.add("garage")

        this.drawTitle();
        this.drawListMachines()

        return this.garage;
    }
    private drawTitle():void {
        this.garage__title = createAndAppendHtmlElement(this.garage, "h2", "garage__title", `${ ConstText.garage__title } (${ 0 }) ` );
        createAndAppendHtmlElement(this.garage, "h3", "garage__page", `${ ConstText.garage__page } (${ this.number_page }) ` );
    }
    private async drawListMachines() {
        const garage__list = createAndAppendHtmlElement(this.garage, "div", "garage__list");
        const cars = await sendRequest('GET', ConstURL.garageURL);

        this.garage__title.innerText = `${ ConstText.garage__title } (${ cars.length }) `
        for ( let i = 0; i < cars.length; i++ ) {
            const garage__item = createAndAppendHtmlElement(garage__list, "div", "garage__item");
            const machine = new Machine(cars[i].id, cars[i].name, cars[i].color);
            garage__item.appendChild( machine.init() );
        }
    }
}