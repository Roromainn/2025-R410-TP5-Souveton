import { View } from "./view.js";
window.onload = ()=>{
    const c = document.querySelector('canvas') as HTMLCanvasElement;
    let view = new View(c);
}