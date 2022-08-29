import Game from "./game.js"
window.addEventListener('load', () => {
    const game = new Game();
    let last_time = 0;
    /**
     * @param {number} time
     */
    const game_loop = (time) => {
        const delta_time =  time - last_time;
        last_time =  time;
        game.update(delta_time);
        game.draw();
        requestAnimationFrame(game_loop);
    }
    requestAnimationFrame(game_loop);
});