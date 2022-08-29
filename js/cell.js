import Entity from './Entity.js'
import {Vector2} from "./vector.js";

export default class Cell extends Entity {
    /**
     * @type {Game}
     */
    #game;
    /**
     * @param {Game} game
     */
    constructor(game) {
        super();
        this.#game = game;
        this.position = new Vector2(0, 0);
    }


    draw() {
        super.draw();
        this.#game.ctx.fillRect(this.position.x, this.position.y, this.#game.grid_size, this.#game.grid_size);
    }
}