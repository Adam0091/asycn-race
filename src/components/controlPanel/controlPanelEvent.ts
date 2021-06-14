import { sendRequest } from "../../typescript/sendRequest";
import * as ConstURL from "../const/constURL";

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
    console.log(" start race ");
}
export function reset() {
    console.log("reset");
}
export function generateCars() {
    console.log("generate cars");
}