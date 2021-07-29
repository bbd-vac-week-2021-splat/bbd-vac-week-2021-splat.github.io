import { Color } from "../models/color.js";
import { Direction } from "../models/direction.js";
import { Player } from "../models/player.js";
import { Command } from "../models/command.js";
import { Turn } from "../models/turn.js";

export const HARD_LEVEL = {

map : [
    ["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
    ["Wall", "Empty", "Empty", "Empty", "Splat 1", "Gate 1", "Empty", "Empty", "Empty", "Junction", "Empty", "Empty", "Gate 2", "Splat 2", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall"],
    ["Wall", "Mixer_A 1", "Wall", "Mixer_B 1 1", "Empty", "Gate 3", "Empty", "Wall", "Wall", "Empty", "Wall", "Empty", "Empty", "Empty", "Mixer_B 2 0", "Wall_Pipe", "Mixer_A 0", "Wall"],
    ["Wall", "Bank_B 0 0", "Wall", "Empty", "Wall", "Wall", "Empty", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Empty", "Wall", "Bank_B 0 1", "Wall"],
    ["Wall", "Splat 1", "Wall", "Gate 0", "Wall", "Wall", "Empty", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Empty", "Wall", "Splat 2", "Wall"],
    ["Wall", "Empty", "Gate 5", "Junction", "Junction", "Empty", "Junction", "Wall", "Wall", "Empty", "Wall", "Junction", "Empty", "Junction", "Junction", "Gate 3", "Empty", "Wall"],
    ["Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall"],
    ["Wall", "Empty", "Splat 1", "Empty", "Junction", "Wall", "Empty", "Wall", "Wall", "Junction", "Empty", "Empty", "Wall", "Empty", "Gate 5", "Bank_B 0 2", "Goal 6", "Wall"],
    ["Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Empty", "Empty", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
    ["Wall", "Empty", "Empty", "Junction", "Junction", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
    ["Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
    ["Wall", "Splat 4", "Wall", "Empty", "Wall", "Empty", "Empty", "Empty", "Empty", "Junction", "Empty", "Junction", "Empty", "Junction", "Empty", "Wall", "Empty", "Wall"],
    ["Wall", "Bank_B 0 3", "Wall", "Empty", "Bank_A", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Splat 0", "Wall"],
    ["Wall", "Mixer_A 2", "Wall", "Mixer_B 4 2", "Empty", "Empty", "Empty", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Empty", "Wall"],
    ["Wall", "Empty", "Empty", "Empty", "Splat 4", "Gate 4", "Empty", "Empty", "Wall", "Empty", "Empty", "Empty", "Wall", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
],

player : new Player(1, 8, Direction.East, Color.green),

solution : [
    
    new Command(Command.repeat_until, new Command(Command.is_tile_current, "Bank"),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_current, "Junction"),[
            new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Wall"),[new Command(Command.turn, Turn.right)],[new Command(Command.turn, Turn.left)])
        ]),
        new Command(Command.if_do_else, new Command(Command.and, new Command(Command.is_tile_ahead, "Splat"),[new Command(Command.is_color, Color.red)]),[new Command(Command.turn, Turn.left)])
    ]),

    new Command(Command.deposit, 3),

    new Command(Command.turn, Turn.back),

    new Command(Command.walk),

    new Command(Command.turn, Turn.right),

    new Command(Command.repeat_until, new Command(Command.is_tile_current, "Bank"),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Splat"),[new Command(Command.turn, Turn.right)]),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Wall"),[new Command(Command.turn, Turn.left)])
    ]),

    new Command(Command.deposit, 1),

    new Command(Command.walk),

    new Command(Command.turn, Turn.right),
    
    new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Wall"),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.and, new Command(Command.is_tile_current, "Junction"),[new Command(Command.is_tile_ahead, "Wall")]),[new Command(Command.turn, Turn.right)],[
            new Command(Command.if_do_else, new Command(Command.and, new Command(Command.is_tile_current, "Junction"),[new Command(Command.is_tile_ahead, "Empty")]),[new Command(Command.turn, Turn.left)])
        ]),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Splat"),[
            new Command(Command.turn, Turn.back),
            new Command(Command.walk),
            new Command(Command.turn, Turn.left)
        ]),
    ]),
    
    new Command(Command.turn, Turn.left),
    
    new Command(Command.repeat_until, new Command(Command.is_color, Color.yellow),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Wall"),[new Command(Command.turn, Turn.left)]),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Wall"),[new Command(Command.turn, Turn.back)])
    ]),
    
    new Command(Command.turn, Turn.right),
    
    new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Gate"),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Wall"),[new Command(Command.turn, Turn.left)]),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Wall"),[new Command(Command.turn, Turn.back)])
    ]),
    
    new Command(Command.turn, Turn.left),
    
    new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Splat"),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_current,"Junction"),[new Command(Command.turn, Turn.right)]),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Wall"),[new Command(Command.turn, Turn.back)])
    ]),
    
    new Command(Command.turn, Turn.back),
    
    new Command(Command.repeat_until, new Command(Command.is_tile_current, "Bank"),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_current, "Junction"),[
            new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Wall"),[new Command(Command.turn, Turn.right)],[new Command(Command.turn, Turn.left)])
        ]),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Splat"),[new Command(Command.turn, Turn.left)])
    
    ]),
    
    new Command(Command.deposit, 0),
    
    new Command(Command.turn, Turn.right),
    
    new Command(Command.repeat_until, new Command(Command.and, new Command(Command.is_tile_current, "Junction"),[new Command(Command.is_tile_ahead, "Empty")]),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Wall"), [new Command(Command.turn, Turn.right)])
    
    ]),
    
    new Command(Command.walk),
    
    new Command(Command.turn, Turn.left),
    
    new Command(Command.repeat_until, new Command(Command.and, new Command(Command.is_tile_current,"Junction"),[new Command(Command.is_color, Color.red)]),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.and, new Command(Command.is_tile_current,"Junction"),[new Command(Command.is_tile_ahead,"Wall")]),[new Command(Command.turn, Turn.left)]),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead,"Wall"),[new Command(Command.turn, Turn.right)])
    
    ]),
    
    new Command(Command.turn, Turn.right),
    
    new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Wall"),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead,"Wall"),[new Command(Command.turn, Turn.right)])
    ]),
    
    new Command(Command.turn, Turn.right),
    
    new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Splat"),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_current,"Junction"),[new Command(Command.turn, Turn.right)]),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Wall"),[new Command(Command.turn, Turn.back)])
    ]),
    
    new Command(Command.turn, Turn.back),
    
    new Command(Command.walk),
    
    new Command(Command.turn, Turn.right),
    
    new Command(Command.repeat_until, new Command(Command.and, new Command(Command.is_tile_current,"Junction"), [new Command(Command.is_tile_ahead,"Empty")]),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead,"Wall"),[new Command(Command.turn, Turn.left)]),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead,"Wall"),[new Command(Command.turn, Turn.back)])
    ]),
    
    new Command(Command.turn, Turn.right),
    
    new Command(Command.repeat_until, new Command(Command.is_color, Color.grey),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_current,"Junction"),[new Command(Command.turn, Turn.right)]),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Wall"),[new Command(Command.turn, Turn.left)])
    ]),
    
    new Command(Command.turn, Turn.back),
    
    new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Wall"),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.and, new Command(Command.is_tile_current,"Junction"),[new Command(Command.is_tile_ahead,"Wall")]),[new Command(Command.turn, Turn.left)]),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead,"Wall"),[new Command(Command.turn, Turn.right)])
    ]),
    
    new Command(Command.turn, Turn.back),
    
    new Command(Command.walk),
    
    new Command(Command.turn, Turn.right),
    
    new Command(Command.repeat_until, new Command(Command.is_color, Color.orange),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.and, new Command(Command.is_tile_current, "Junction"),[new Command(Command.is_tile_ahead,"Wall")]),[new Command(Command.turn,Turn.left)]),
        new Command(Command.if_do_else, new Command(Command.and, new Command(Command.is_tile_current, "Junction"),[new Command(Command.is_tile_ahead,"Gate")]),[new Command(Command.turn,Turn.right)])
    ]),
    
    new Command(Command.turn, Turn.right),
    
    new Command(Command.repeat_until, new Command(Command.is_tile_ahead,"Wall"),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead,"Wall"),[new Command(Command.turn, Turn.right)])
    ]),
    
    new Command(Command.turn, Turn.back),
    
    new Command(Command.repeat_until, new Command(Command.is_tile_ahead,"Gate"),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead,"Wall"),[new Command(Command.turn, Turn.left)]),
        new Command(Command.if_do_else, new Command(Command.is_tile_current,"Junction"),[new Command(Command.turn, Turn.right)])
    ]),
    
    new Command(Command.turn, Turn.left),
    
    new Command(Command.repeat_until, new Command(Command.and, new Command(Command.is_tile_current,"Junction"),[new Command(Command.is_color, Color.yellow)]),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead,"Wall"),[new Command(Command.turn,Turn.right)]),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead,"Wall"),[new Command(Command.turn,Turn.back)])
    ]),
    
    new Command(Command.turn, Turn.left),
    new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Wall"),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.or, new Command(Command.is_tile_ahead,"Wall"),[new Command(Command.is_tile_current,"Junction")]),[new Command(Command.turn,Turn.left)])
    ]),
    
    new Command(Command.turn,Turn.right),
    new Command(Command.repeat_until, new Command(Command.is_tile_ahead,"Wall"),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.and, new Command(Command.is_tile_ahead,"Wall"),[new Command(Command.is_tile_current,"Junction")]),[new Command(Command.turn,Turn.left)]),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead,"Wall"),[new Command(Command.turn, Turn.right)])
    ]),
    
    new Command(Command.turn, Turn.right),
    
    new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Splat"),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_current,"Junction"),[new Command(Command.turn, Turn.right)]),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Wall"),[new Command(Command.turn, Turn.back)])
    ]),
    
    new Command(Command.turn, Turn.back),
    
    new Command(Command.repeat_until, new Command(Command.is_tile_current, "Bank"),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_current, "Junction"),[
            new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Wall"),[new Command(Command.turn, Turn.right)],[new Command(Command.turn, Turn.left)])
        ]),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Splat"),[new Command(Command.turn, Turn.left)])
    ]),
    
    new Command(Command.deposit, 2),
    
    new Command(Command.turn, Turn.right),
    
    new Command(Command.repeat_until, new Command(Command.and, new Command(Command.is_tile_current, "Junction"),[new Command(Command.is_tile_ahead,"Empty")]),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead,"Wall"),[new Command(Command.turn, Turn.right)])
    ]),
    
    new Command(Command.walk),
    
    new Command(Command.turn, Turn.left),
    
    new Command(Command.repeat_until, new Command(Command.is_tile_ahead,"Wall"),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead,"Wall"),[new Command(Command.turn, Turn.right)])
    ]),
    
    new Command(Command.turn, Turn.back),
    
    new Command(Command.repeat_until, new Command(Command.reached_end),[
        new Command(Command.walk),
        new Command(Command.if_do_else, new Command(Command.is_tile_ahead,"Wall"),[new Command(Command.turn, Turn.left)]),
        new Command(Command.if_do_else, new Command(Command.is_tile_current,"Junction"),[new Command(Command.turn, Turn.right)])
    ])
]
};