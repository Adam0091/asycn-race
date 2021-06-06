import { Header } from "./components/header/header";
import { ControlPanel } from "./components/controlPanel/controlPanel"

const ROOT = document.createElement("div");
ROOT.classList.add(".root");
document.body.appendChild(ROOT);

const HEADER = new Header();
const CONTROL_PANEL = new ControlPanel()

ROOT.appendChild( HEADER.init() );
ROOT.appendChild( CONTROL_PANEL.init() );