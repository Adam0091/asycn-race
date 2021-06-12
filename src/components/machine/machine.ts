import { createAndAppendHtmlElement } from "../../typescript/add-element-function";
import * as ConstText from "../const/const";
import { getSvgCar } from "./machine_svg";

export class Machine {
    private machine:HTMLElement;
    private name:string;
    private color:string;
    private id:number;

    constructor(id:number ,name:string, color:string) {
        this.id = id;
        this.name = name;
        this.color = color;
    }

    public init():HTMLElement {
        this.machine = document.createElement("div");
        this.machine.classList.add("machine")

        this.drawButtonsAndNameMachine();
        this.drawControlButtons();

        return this.machine;
    }
    private drawButtonsAndNameMachine():void {
        const machine__row = createAndAppendHtmlElement( this.machine, "div", "machine__row");
        const buttonSelect = createAndAppendHtmlElement( machine__row, "button", "machine__btn-select", ConstText.machine_btn_select );
        const buttonRemove = createAndAppendHtmlElement( machine__row, "button", "machine__btn-remove", ConstText.machine_btn_remove );

        const machineName = createAndAppendHtmlElement( machine__row, "div", "machine__name", this.name );
    }
    private drawControlButtons():void {
        const machine__row = createAndAppendHtmlElement( this.machine, "div", "machine__row");
        const machine__control_btns = createAndAppendHtmlElement( machine__row, "div", "machine__control-btns" );
        const control_btns__A = createAndAppendHtmlElement( machine__control_btns, "button", "control_btns__A", "A" );
        const control_btns__B = createAndAppendHtmlElement( machine__control_btns, "button", "control_btns__B", "B" );

        this.drawMachine( machine__row );
    }
    private drawRaceTrack():void {

    }
    private drawMachine(machine__row:HTMLElement):void {
        const machine__svg = createAndAppendHtmlElement( machine__row, "div", "machine__svg");
        machine__svg.innerHTML = getSvgCar(this.color);
        machine__svg.style.width = "60px";
    }
}