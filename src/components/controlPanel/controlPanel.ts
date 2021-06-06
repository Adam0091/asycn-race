import { createAndAppendHtmlElement } from "../../typescript/add-element-function";

export class ControlPanel {
    private control_panel:HTMLElement;

    public init():HTMLElement {
        this.control_panel = document.createElement("div");
        this.control_panel.classList.add("control_panel");

        this.drawCreateCarInput();
        this.drawUpdateCarInput();
        this.drawButtons();

        return this.control_panel;
    }
    private drawCreateCarInput():void {
        const create_car_input = createAndAppendHtmlElement( this.control_panel, "div", "create_car_input" );
        const create_car_input__car_name = createAndAppendHtmlElement( create_car_input, "input", "create_car_input__car_name" );
        create_car_input__car_name.setAttribute( "type", "text" );
        const create_car_input__car_color = createAndAppendHtmlElement( create_car_input, "input", "create_car_input__car_color" );
        create_car_input__car_color.setAttribute( "type", "color" );
        const create_car_input__btn = createAndAppendHtmlElement( create_car_input, "button", "create_car_input__btn", "CREATE" );
    }
    private drawUpdateCarInput():void {
        const update_car_input = createAndAppendHtmlElement( this.control_panel, "div", "update_car_input" );
        const update_car_input__car_name = createAndAppendHtmlElement( update_car_input, "input", "update_car_input__car_name" );
        update_car_input__car_name.setAttribute( "type", "text" );
        const update_car_input__car_color = createAndAppendHtmlElement( update_car_input, "input", "update_car_input__car_color" );
        update_car_input__car_color.setAttribute( "type", "color" );
        const update_car_input__btn = createAndAppendHtmlElement( update_car_input, "button", "update_car_input__btn", "UPDATE" );
    }
    private drawButtons():void {
        const control_panel__buttons = createAndAppendHtmlElement( this.control_panel, "div", "control_panel__buttons" );
        const control_panel__btn_race = createAndAppendHtmlElement( control_panel__buttons, "button", "control_panel__btn_race", "RACE" );
        const control_panel__btn_reset = createAndAppendHtmlElement( control_panel__buttons, "button", "control_panel__btn_reset", "RESET" );
        const control_panel__btn_generate_cars = createAndAppendHtmlElement( control_panel__buttons, "button", "control_panel__btn_generate_cars", "GENERATE CARS" );
    }
}