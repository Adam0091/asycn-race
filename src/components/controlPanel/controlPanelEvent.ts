import { sendRequest } from "../../typescript/sendRequest";
import * as ConstURL from "../const/constURL";
import * as BrandsAndModel from "../const/brands_and_models_of_cars";

export function createCar(name:string, color:string) {
    sendRequest ('POST', ConstURL.garageURL, JSON.stringify({
        name: name,
        color: color
    }));
}
export function updateCar(selectID: number, name:string, color:string) {
    sendRequest('PUT',  ConstURL.garageURL+`/${selectID}`, JSON.stringify({
        name: name,
        color: color
    }))
}
export function startRace() {
    const machines = document.querySelectorAll(".machine")
    machines.forEach( (item) => {
        const buttonStart = item.querySelector(".control_btns__A") as HTMLButtonElement;
        const buttonRace =  document.querySelector(".control_panel__btn_race") as HTMLButtonElement;
        const buttonReset =  document.querySelector(".control_panel__btn_reset") as HTMLButtonElement;
        buttonRace.disabled = true;
        buttonReset.disabled = false;

        buttonStart.click();
    })
}
export function reset() {
    const machines = document.querySelectorAll(".machine")
    machines.forEach( (item) => {
        const buttonStop = item.querySelector(".control_btns__B") as HTMLButtonElement;
        const buttonRace =  document.querySelector(".control_panel__btn_race") as HTMLButtonElement;
        const buttonReset =  document.querySelector(".control_panel__btn_reset") as HTMLButtonElement;
        buttonRace.disabled = false;
        buttonReset.disabled = true;

        buttonStop.click()
    })
}
export function generateCars() {
    for(let i = 0; i < 100; i++) {
        const randomBrands = Math.floor( Math.random() * 10 );
        const brand = String(BrandsAndModel.brands[randomBrands])
        const randomModel = Math.floor( Math.random() * 10 );
        const model = BrandsAndModel.mordels[brand][randomModel];
        const name = `${brand}  ${model}`;

        let color = "#";
        for(let j = 0; j < 6; j++) {
            const n = Math.floor( Math.random() * 16 );
            color += Number(n).toString(16)
        }

        createCar(name, color);
    }
}