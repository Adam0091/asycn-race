import { createAndAppendHtmlElement } from "../../typescript/add-element-function";

export class Header {
    private header:HTMLElement;

    public init():HTMLElement {
        this.header = document.createElement("header");
        this.header.classList.add("header");
        this.drawNav();

        return this.header;
    }
    private drawNav():void {
        const header__nav = createAndAppendHtmlElement( this.header, "nav", "header__nav" );
        const nav__garage_btn = createAndAppendHtmlElement( header__nav, "button", "nav__garage_btn", "TO GARAGE" );
        const nav__winners_btn = createAndAppendHtmlElement( header__nav, "button", "nav__winners_btn", "TO WINNERS" );
    }
}