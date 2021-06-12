import { Header } from "./components/header/header";
import { ControlPanel } from "./components/controlPanel/controlPanel";
import { Garage } from "./components/garage/garage";
import "./style/main.scss";

const ROOT = document.createElement("div");
ROOT.classList.add(".root");
document.body.appendChild(ROOT);

const HEADER = new Header();
const CONTROL_PANEL = new ControlPanel();
const GARAGE = new Garage();

ROOT.appendChild( HEADER.init() );
ROOT.appendChild( CONTROL_PANEL.init() );
ROOT.appendChild( GARAGE.init() );
