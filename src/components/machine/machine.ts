import { createAndAppendHtmlElement } from "../../typescript/add-element-function";
import * as ConstText from "../const/const";
import { getSvgCar } from "./machine_svg";

interface MachineButtons {
    buttonSelect?: HTMLElement;
    buttonRemove?: HTMLElement;
    control_btns__A?: HTMLElement;
    control_btns__B?: HTMLElement;
}

export class Machine {
    private machine:HTMLElement;
    private name:string;
    private color:string;
    private id:number;
    private BUTTONS:MachineButtons = {};

    constructor(id:number ,name:string, color:string) {
        this.id = id;
        this.name = name;
        this.color = color;
    }

    public init():HTMLElement {
        this.machine = document.createElement("div");
        this.machine.classList.add("machine")
        this.machine.id = String(this.id);

        this.drawButtonsAndNameMachine();
        this.drawControlButtons();

        return this.machine;
    }
    private drawButtonsAndNameMachine():void {
        const machine__row = createAndAppendHtmlElement( this.machine, "div", "machine__row");
        const buttonSelect = createAndAppendHtmlElement( machine__row, "button", "machine__btn-select", ConstText.machine_btn_select );
        buttonSelect.classList.add("button");
        const buttonRemove = createAndAppendHtmlElement( machine__row, "button", "machine__btn-remove", ConstText.machine_btn_remove );
        buttonRemove.classList.add("button");
        const machineName = createAndAppendHtmlElement( machine__row, "div", "machine__name", this.name );

        this.BUTTONS.buttonSelect = buttonSelect;
        this.BUTTONS.buttonRemove = buttonRemove;
    }
    private drawControlButtons():void {
        const machine__row = createAndAppendHtmlElement( this.machine, "div", "machine__row_machine");
        const machine__control_btns = createAndAppendHtmlElement( machine__row, "div", "machine__control-btns" );

        const control_btns__A = createAndAppendHtmlElement( machine__control_btns, "button", "control_btns__A", "A" );
        const control_btns__B = createAndAppendHtmlElement( machine__control_btns, "button", "control_btns__B", "B" );
        control_btns__B.setAttribute("disabled","");

        this.BUTTONS.control_btns__A = control_btns__A;
        this.BUTTONS.control_btns__B = control_btns__B;

        const machine__machine_svg_and_race_track = createAndAppendHtmlElement( machine__control_btns, "div", "machine__machine_svg_and_race_track" );
        this.drawMachine(machine__machine_svg_and_race_track);
        this.drawRaceTrack(machine__machine_svg_and_race_track);
    }
    private drawRaceTrack(machine__row:HTMLElement):void {
        const machine__race_track = createAndAppendHtmlElement( machine__row, "div", "machine__race_track");
    }
    private drawMachine(machine__row:HTMLElement):void {
        const machine__svg = createAndAppendHtmlElement( machine__row, "div", "machine__svg");
        machine__svg.innerHTML = getSvgCar(this.color);
        machine__svg.style.width = "60px";
        machine__svg.style.height = "26px";
    }
    
    public get layout() : HTMLElement {
        return this.machine;
    }
    
    public get buttons() : MachineButtons {
        return  this.BUTTONS;
    }
    
    public get ID() : number {
        return  this.id;
    }
    
}