import { createAndAppendHtmlElement } from "../../typescript/add-element-function";
import { getSvgCar } from "../machine/machine_svg";

export class Winner {
    private winner: HTMLElement;
    private id:number;
    private color: string;
    private name:string;
    private wins:number;
    private best_time:number;

    constructor(id:number, color:string, name:string, wins:number, best_time:number) {
        this.id = id;
        this.color = color; 
        this.name = name;
        this.wins = wins;
        this.best_time = best_time;
    }

    public init():HTMLElement {
        this.winner = document.createElement("div");
        this.winner.classList.add("winner");

        const winner__number = createAndAppendHtmlElement(this.winner, "div", "winner__number", String(this.id));
        const winner__car = createAndAppendHtmlElement(this.winner, "div", "winner__car");
        winner__car.innerHTML = getSvgCar(this.color);
        winner__car.style.width = "50px";
        winner__car.style.height = "28px";
        const winner__name = createAndAppendHtmlElement(this.winner, "div", "winner__name", this.name);
        const winner__wins = createAndAppendHtmlElement(this.winner, "div", "winner__wins", String(this.wins));
        const winner__time = createAndAppendHtmlElement(this.winner, "div", "winner__best_time", String(this.best_time + 's'));

        winner__number.classList.add("winner__item");
        winner__car.classList.add("winner__item");
        winner__name.classList.add("winner__item");
        winner__wins.classList.add("winner__item");
        winner__time.classList.add("winner__item");

        return this.winner;
    }
 
    public get layout() : HTMLElement {
        return this.winner;
    }
}