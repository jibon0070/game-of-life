import Cell from "./cell.js";
import {Vector2} from "./vector.js";

export default class Game {
    /**
     * @type {HTMLCanvasElement}
     */
    #canvas;
    /**
     * @type {CanvasRenderingContext2D}
     */
    ctx;
    /**
     * @type {number}
     */
    #number_of_cells_in_a_row = 20;
    /**
     * @type {number}
     */
    grid_size;
    /**
     * @type {Entity[]}
     */
    #entities = [];
    /**
     * @type {number[][]}
     */
    #metrics;

    constructor() {
        this.#canvas = document.querySelector("canvas");
        this.ctx = this.#canvas.getContext("2d");
        this.#resize_canvas()
        window.onresize = this.#resize_canvas.bind(this);
        this.#init();
    }

    /**
     * @param {number} delta_time
     */
    update(delta_time) {
        this.#entities.map(entity => entity.update(delta_time));
        // this.#check_rules();
    }

    draw() {
        this.#clear();
        this.#entities.map(entity => entity.draw());
    }

    #clear() {
        this.ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    #resize_canvas() {
        if (window.innerWidth < window.innerHeight) {
            this.grid_size = Math.floor(window.innerWidth / this.#number_of_cells_in_a_row)
        } else {
            this.grid_size = Math.floor(window.innerHeight / this.#number_of_cells_in_a_row)
        }
        this.#canvas.width = this.#canvas.height = this.grid_size * this.#number_of_cells_in_a_row;

    }

    #init() {
        this.#generate_cells()
    }

    #generate_cells() {
        this.#metrics = new Array(this.#number_of_cells_in_a_row).fill(new Array(this.#number_of_cells_in_a_row).fill(0))
        this.#metrics = this.#metrics.map(row => {
            return row.map(() =>{
                return Math.round(Math.random())
            })
        });
        this.#entities = this.#metrics_to_cell(this.#metrics)
        this.#check_rules();
    }

    /**
     * @return {number[][]}
     * @param metrics
     */
    #metrics_to_cell(metrics) {
        const entities = [];
        metrics.map((row, y) => {
            row.map((column, x) =>{
                if (column) {
                    const cell = new Cell(this);
                    cell.position = new Vector2(x * this.grid_size, y * this.grid_size);
                    entities.push(cell);
                }
            })
        })
        return entities;
    }

    #check_rules() {
        this.#metrics = this.#metrics.map((row, y) => {
            return row.map((column, x) => {
                const is_top_row = y === 0
                const is_bottom_row = y === this.#number_of_cells_in_a_row - 1
                const is_left_row = x === 0;
                const is_right_row = x === this.#number_of_cells_in_a_row - 1;
                const value =  this.#metrics[y][x];
                console.log(value);
                return column
            })
        });
    }
}