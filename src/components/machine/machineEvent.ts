import { sendRequest } from "../../typescript/sendRequest";
import * as ConstURL from "../const/constURL";

export function deleteCar(id:number) {
    sendRequest('DELETE', ConstURL.garageURL+`/${id}`);
}
export async function startEngine(id:number) {
    const cars = await sendRequest('GET', ConstURL.engineURL+`?id=${id}&status=started`);
    return await Promise.resolve(cars);
}
export async function stopEngine(id:number) {
    const cars = await sendRequest('GET', ConstURL.engineURL+`?id=${id}&status=stopped`);
    return await Promise.resolve(cars);
}
export async function carSuccess(id:number) {
    const success = await sendRequest('GET', ConstURL.engineURL+`?id=${id}&status=drive`);
    return await Promise.resolve(success);
}
export async function sendWinner(id:number, time: number) {
    const itIsWinners = sendRequest('GET', ConstURL.winnersURL+`/${id}`);
    itIsWinners.then( (winner) => {
        if(Object.keys(winner).length !== 0) {
            sendRequest( 'PUT', ConstURL.winnersURL+`/${id}`, JSON.stringify({
                wins: ++winner.wins,
                time: time 
            }) )
        } else {
            sendRequest('POST', ConstURL.winnersURL, JSON.stringify({
                id: id,
                wins: 1,
                time: time
            }));
        }
    });
}