import { createAndAppendHtmlElement } from "../../typescript/add-element-function";


interface Header_BTNS {
    garage_btn?:HTMLElement,
    winners_btn?:HTMLElement,
}

export class Header {
    private header:HTMLElement;
    private BUTTONS:Header_BTNS;


    public init():HTMLElement {
        this.header = document.createElement("header");
        this.header.classList.add("header");
        this.drawNav();

        return this.header;
    }
    private drawNav():void {
        const header__nav = createAndAppendHtmlElement( this.header, "nav", "header__nav" );

        const nav__garage_btn = createAndAppendHtmlElement( header__nav, "button", "nav__garage_btn", "TO GARAGE" );
        nav__garage_btn.classList.add("button");

        const nav__winners_btn = createAndAppendHtmlElement( header__nav, "button", "nav__winners_btn", "TO WINNERS" );
        nav__winners_btn.classList.add("button");

        this.BUTTONS = {
            garage_btn: nav__garage_btn,
        }
        this.BUTTONS.winners_btn = nav__winners_btn;
    }
    
    public get layout() : HTMLElement {
        return this.header;
    }
    
    
    public get buttons() : Header_BTNS {
        return this.BUTTONS;
    }
}