import { createAndAppendHtmlElement } from "../../typescript/add-element-function";
import { sendRequest } from "../../typescript/sendRequest";
import { Winner } from "../winner/winner";
import * as ConstURL from "../const/constURL";
import * as ConstText from "../const/const";


interface Params {
    _page:number,
    _limit:number,
    //'id'|'wins'|'time'
    _sort:string
    //'ASC'|'DESC'
    _order:string
}

export class Winners {
    private winners:HTMLElement;
    private winners__title:HTMLElement;
    private winners__list: HTMLElement;
    private winners__buttons_for_pages: HTMLElement;

    private isActive = false;
    private isArrWins: boolean;
    private isArrTime: boolean;
    private orderUp:boolean;

    private number_page = 1;
    private countWinners = 0;
    private params:Params = {
        _page:1,
        _limit:10,
        _sort:"id",
        _order:"ASC"
    };

    public init():void {


        this.winners = document.createElement("div");
        this.winners.classList.add("winners");

        this.getCountWinners().then((winners)=> {
            this.countWinners = winners.length;
            this.drawTitle();
            this.getWinners(this.params).then((winners)=>{
                this.drawWinnersList(winners, this.winners);
                this.drawButtonsForPage();
            });
        });

    }
    private drawTitle():void {
        this.winners__title = createAndAppendHtmlElement( this.winners, "div", "winners__title");
        createAndAppendHtmlElement(this.winners__title, "div", "winners__count", `${ConstText.winners__count} (${this.countWinners})`)
        createAndAppendHtmlElement(this.winners__title, "div", "winners__page", `${ConstText.page} #${this.number_page}`)
    }
    private async getWinners(params:Params) {
        const stringParamsForURL =  `/?_page=${params._page}&_limit=${params._limit}&_sort=${params._sort}&_order=${params._order}`
        const winners = await sendRequest("GET", ConstURL.winnersURL + stringParamsForURL)
        return Promise.resolve(winners);
    }
    private async getCountWinners() {
        const winners = await sendRequest("GET", ConstURL.winnersURL+`/?_limit`);
        return Promise.resolve(winners);
    }
    private async getWinnerCar(id:number) {
        const winnerCar = await sendRequest("GET", ConstURL.garageURL +`/${id}`);
        return Promise.resolve(winnerCar);
    }
    private drawWinnersList(winners:Array<{id:number, wins:number, time:number}>, parant:HTMLElement):void {
        this.winners__list = createAndAppendHtmlElement(parant, "div", "winners__list");
        this.drawWinnersListHeader(this.winners__list);

        winners.forEach((winner, i)=>{
            this.getWinnerCar(winner.id).then((car:{ name:string, color: string, id: number })=>{
                const number = i + 1 + (this.number_page - 1) * 10;
                const win = new Winner( number, car.color, car.name, winner.wins, winner.time );
                this.winners__list.appendChild( win.init() )
            });
        });
    }
    private drawWinnersListHeader(winners__list:HTMLElement) {
        const winners__header_list = createAndAppendHtmlElement(winners__list, "div", "list__list_header");
        const header_list__number = createAndAppendHtmlElement(winners__header_list, "div", "list_header__number", ConstText.winners__number);
        const header_list__car = createAndAppendHtmlElement(winners__header_list, "div", "list_header__car", ConstText.winners__car);
        const header_list__name = createAndAppendHtmlElement(winners__header_list, "div", "list_header__name", ConstText.winners__name);
        const header_list__wins = createAndAppendHtmlElement(winners__header_list, "div", "list_header__wins", ConstText.winners__wins);
        const header_list__best_time = createAndAppendHtmlElement(winners__header_list, "div", "list_header__best_time", ConstText.winners__best_time);

        if(this.isActive) {
            if(this.isArrWins){
                header_list__wins.innerHTML = this.orderUp ? 
                    ConstText.winners__wins + ` ↑` :
                    ConstText.winners__wins + ` ↓`
            }
            if(this.isArrTime){
                header_list__best_time.innerHTML = this.orderUp ? 
                    ConstText.winners__best_time + ` ↑` :
                    ConstText.winners__best_time + ` ↓`
            }
        }

        header_list__number.classList.add("list_header__item");
        header_list__car.classList.add("list_header__item");
        header_list__name.classList.add("list_header__item");
        header_list__wins.classList.add("list_header__item");
        header_list__best_time.classList.add("list_header__item");
    }
    private drawButtonsForPage():void {
        const countPage = Math.ceil( this.countWinners / 10);

        this.winners__buttons_for_pages = createAndAppendHtmlElement(this.winners, "div", "winners__buttons_for_pages");
        const buttons_for_pages__back = createAndAppendHtmlElement(this.winners__buttons_for_pages, "button", "buttons_for_pages__back", ConstText.btn_back) as HTMLButtonElement;
        buttons_for_pages__back.classList.add("button");
        if( this.number_page >  1)  buttons_for_pages__back.disabled = false;
        else buttons_for_pages__back.disabled = true;
        
        const buttons_for_pages__next = createAndAppendHtmlElement(this.winners__buttons_for_pages, "button", "buttons_for_pages__next", ConstText.btn_next) as HTMLButtonElement;
        buttons_for_pages__next.classList.add("button");
        if( this.number_page < countPage)  buttons_for_pages__next.disabled = false;
        else buttons_for_pages__next.disabled = true;
    }
    public update():void {
        this.updateWinnersTitle();
        this.updateWinnersList();
        this.updateButtonsForPage();
    }
    private updateWinnersTitle():void {
        this.getCountWinners().then((winners)=>{
            this.countWinners = winners.length;
            const winners__count = this.winners__title.querySelector(".winners__count");
            const winners__page = this.winners__title.querySelector(".winners__page");
            winners__count.innerHTML = `${ConstText.winners__count} (${this.countWinners})`;
            winners__page.innerHTML =  `${ConstText.page} #${this.number_page}`;
        });
    }
    private updateWinnersList():void {
        this.getWinners(this.params).then((winners:Array<{id:number, wins:number, time:number}>)=>{
            this.winners__list.innerHTML = "";
            this.drawWinnersListHeader(this.winners__list);

            winners.forEach((winner, i)=>{
                this.getWinnerCar(winner.id).then((car:{ name:string, color: string, id: number })=>{
                    const number = i + 1 + (this.number_page - 1) * 10;
                    const win = new Winner( number, car.color, car.name, winner.wins, winner.time );
                    this.winners__list.appendChild( win.init() )
                });
            })
        });
    }
    private updateButtonsForPage() {
        const countPage = Math.ceil( this.countWinners / 10);    
    
        const buttons_for_pages__back = this.winners__buttons_for_pages.querySelector(".buttons_for_pages__back") as HTMLButtonElement;
        const buttons_for_pages__next = this.winners__buttons_for_pages.querySelector(".buttons_for_pages__next") as HTMLButtonElement;

        if( this.number_page >  1)  buttons_for_pages__back.disabled = false;
        else buttons_for_pages__back.disabled = true;

        if( this.number_page < countPage)  buttons_for_pages__next.disabled = false;
        else buttons_for_pages__next.disabled = true;

    }
    
    public get layout() : HTMLElement {
        return this.winners;
    }
    public backPage(){
        this.number_page--;
        this.params._page = this.number_page;
    }
    public nextPage(){
        this.number_page++;
        this.params._page = this.number_page;
    }
    public setParams(typeSort:string, orderUp:boolean){
        this.isActive = true;
        this.params._sort = typeSort;
        this.params._order = orderUp ? "ASC" : "DESC";

        this.isArrWins = false;
        this.isArrTime = false;
        this.orderUp = orderUp;
        
        if(typeSort === "wins") this.isArrWins = true;
        if(typeSort === "time") this.isArrTime = true;
    }
}