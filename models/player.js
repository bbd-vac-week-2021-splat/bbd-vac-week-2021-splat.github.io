import { Color } from "./color.js";
import { Direction } from "./direction.js";

export class Player {
    x = 0;
    y = 0;
    dir = Direction.North;
    color = Color.orange;

    constructor(x, y, dir, color) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.color = color;
    }

    tryWalk() {

        switch(this.dir) {
            case Direction.North: return new Player(this.x, this.y-1, this.dir, this.color);

            case Direction.East: return new Player(this.x+1, this.y, this.dir, this.color);

            case Direction.South: return new Player(this.x, this.y+1, this.dir, this.color);

            case Direction.West: return new Player(this.x-1, this.y, this.dir, this.color);
            
            default: return new Player(this.x, this.y, this.dir, this.color);
        }
    }

    turn(val) {
        //Ensure that -1 gets wrapped to 3
        this.dir = (this.dir + val) % 4;
    }
}