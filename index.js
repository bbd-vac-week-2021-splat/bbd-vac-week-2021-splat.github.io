import { Engine } from "./engine/engine.js";
import { LEVEL_1 } from "./levels/levels.js";
import { Command } from "./models/Command.js";
import { Direction } from "./models/direction.js";
import { Turn } from "./models/turn.js";

document.getElementById("start").onclick = function() {  
    start();
}; 

function start() {

    let commands = [
        new Command(Command.turn, Turn.right),
        new Command(Command.walk),
        new Command(Command.turn, Turn.right),
        new Command(Command.walk),

        new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Wall"), [
            new Command(Command.walk)
        ])
    ];
    
    let engine = new Engine(LEVEL_1.map, LEVEL_1.player, commands);
    
    engine.getMapChanges();
    
    let map = engine.map;
    let player = engine.player;
    
    for (let y = 0; y < 18; y++) {
        let line = "";
    
        for (let x = 0; x < 18; x++) {
    
            let tile = map[y][x];
            
    
            if (player.x === x && player.y === y) {

                if (player.dir === Direction.North) {
                    line += "n ";
                } else if (player.dir === Direction.East) {
                    line += "e ";
                } else if (player.dir === Direction.South) {
                    line += "s ";
                } else if (player.dir === Direction.West) {
                    line += "w ";
                }
    
            } else if (tile === "Wall") {
                line += "# ";
    
            } else if (tile === "Empty") {
                line += "- ";

            } else if (tile.startsWith("Splat")) {
                line += "S ";

            } else if (tile.startsWith("Gate")) {
                line += "G ";
            }
        }
    
        document.getElementById("text").value += line + "\n";
    }
}