import { createAndAppendHtmlElement } from "../../typescript/add-element-function";

export class Garage {
    private garage:HTMLElement;
    private number_page: 1;

    public init():HTMLElement {
        this.garage = document.createElement("div");
        this.garage.classList.add("garage")

        return this.garage;
    }
    private drawTitle() {

    }

}