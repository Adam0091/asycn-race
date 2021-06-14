import { sendRequest } from "../../typescript/sendRequest";
import * as ConstURL from "../const/constURL";

export function deleteCar(id:number) {
    document.getElementById( String( id ) ).remove();
    sendRequest('DELETE', ConstURL.garageURL+`/${id}`);
}
export function startEngine(id:number) {
    console.log("car go")
}
export function stopEngine(id:number) {
    console.log("car go")
}