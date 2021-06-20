export function drawGarage(control_panel:HTMLElement, garage: HTMLElement) {
    const app = document.querySelector(".app") as HTMLElement;
    app.appendChild(control_panel);
    app.appendChild(garage);
}
export function drawWinners(winners:HTMLElement) {
    const app = document.querySelector(".app") as HTMLElement;
    app.appendChild(winners);
}