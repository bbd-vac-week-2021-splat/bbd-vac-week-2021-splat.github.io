import { Converter } from "../blockly/converter.js";
import { Engine } from "../engine/engine.js";
import { Render } from "../engine/render.js";
import { LEVEL_4 } from "../levels/level4.js"

//Vars
var render;

//Reset
reset();

//Link buttons
document.getElementById("start").onclick = function() {  
    start();
};

document.getElementById("reset").onclick = function() {  
    reset();
};

function reset() {

    if (!!render) {
        render.stopRender();
        render.resetTo(LEVEL_4);

    } else {
        render = new Render(document.getElementById("map"), [LEVEL_4]);
        render.renderFirst();
    }
}


async function start() {

    let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    let commands = Converter.convert(code);

    if (commands === null || commands === undefined) {
        alert("Cannot start an empty solution");
        return;
    }
    
    render.stopRender();
    let engine = new Engine(LEVEL_4.map, LEVEL_4.player, commands);
    let res = engine.start();
    let changes = engine.changes;

    render.changes = changes;
    render.messageState = res;
    await render.startRender();
}