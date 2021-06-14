import { createAndAppendHtmlElement } from "../../typescript/add-element-function";

interface ControlPanelButtons {
    create_car_input__btn?: HTMLElement;
    update_car_input__btn?: HTMLElement;
    control_panel__btn_race?: HTMLElement;
    control_panel__btn_reset?: HTMLElement;
    control_panel__btn_generate_cars?: HTMLElement;
}

export class ControlPanel {
    private control_panel:HTMLElement;
    private create_input_text: HTMLInputElement;
    private update_input_text: HTMLInputElement;
    private create_input_color: HTMLInputElement;
    private update_input_color: HTMLInputElement;
    private BUTTONS: ControlPanelButtons = {};

    public init():HTMLElement {
        this.control_panel = document.createElement("div");
        this.control_panel.classList.add("control_panel");

        this.drawCreateCarInput();
        this.drawUpdateCarInput();
        this.drawButtons();

        return this.control_panel;
    }
    private drawCreateCarInput():void {
        const create_car_input = createAndAppendHtmlElement( this.control_panel, "div", "control_panel__create_car_input" );
        this.create_input_text = createAndAppendHtmlElement( create_car_input, "input", "create_car_input__car_name" ) as HTMLInputElement;
        this.create_input_text.setAttribute( "type", "text" );
        this.create_input_color = createAndAppendHtmlElement( create_car_input, "input", "create_car_input__car_color" ) as HTMLInputElement;
        this.create_input_color.setAttribute( "type", "color" );
        this.create_input_color.setAttribute( "value", "#00ffff" );
        const create_car_input__btn = createAndAppendHtmlElement( create_car_input, "button", "create_car_input__btn", "CREATE" );
        create_car_input__btn.classList.add("button");

        this.BUTTONS.create_car_input__btn = create_car_input__btn;
    }
    private drawUpdateCarInput():void {
        const update_car_input = createAndAppendHtmlElement( this.control_panel, "div", "control_panel__update_car_input" );
        this.update_input_text = createAndAppendHtmlElement( update_car_input, "input", "update_car_input__car_name" ) as HTMLInputElement;
        this.update_input_text.setAttribute( "type", "text" );
        this.update_input_color = createAndAppendHtmlElement( update_car_input, "input", "update_car_input__car_color" ) as HTMLInputElement;
        this.update_input_color.setAttribute( "type", "color" );
        this.update_input_color.setAttribute( "value", "#00ffff" );

        const update_car_input__btn = createAndAppendHtmlElement( update_car_input, "button", "update_car_input__btn", "UPDATE" );
        update_car_input__btn.classList.add("button");

        this.BUTTONS.update_car_input__btn = update_car_input__btn;

        update_car_input__btn.setAttribute("disabled","");
    }
    private drawButtons():void {
        const control_panel__buttons = createAndAppendHtmlElement( this.control_panel, "div", "control_panel__buttons" );
        const control_panel__btn_race = createAndAppendHtmlElement( control_panel__buttons, "button", "control_panel__btn_race", "RACE" );
        const control_panel__btn_reset = createAndAppendHtmlElement( control_panel__buttons, "button", "control_panel__btn_reset", "RESET" );
        const control_panel__btn_generate_cars = createAndAppendHtmlElement( control_panel__buttons, "button", "control_panel__btn_generate_cars", "GENERATE CARS" );
        control_panel__btn_race.classList.add("button");
        control_panel__btn_reset.classList.add("button");
        control_panel__btn_generate_cars.classList.add("button");

        this.BUTTONS.control_panel__btn_race = control_panel__btn_race;
        this.BUTTONS.control_panel__btn_reset = control_panel__btn_reset;
        this.BUTTONS.control_panel__btn_generate_cars = control_panel__btn_generate_cars;
    }

    public get layout() : HTMLElement {
        return this.control_panel;
    }
    public get buttons() : ControlPanelButtons {
        return this.BUTTONS;
    }
    
    public getCreateCarName() : string {
        return this.create_input_text.value;
    }
    public getUpdateCarName() : string {
        return  this.update_input_text.value;
    }
    public getCreateCarColor() : string {
        return this.create_input_color.value;
    }
    public getUpdateCarColor() : string {
        return  this.update_input_color.value;
    }
}