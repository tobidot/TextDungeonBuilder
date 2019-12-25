import Screen from "./graphic/Screen";
import InputBar from "./ui/InputBar";
import Game from "./game/Game";

(() => {
    let app = document.getElementById('app');
    app.setAttribute('tabindex', '1');
    let screen = new Screen(app);
    let inputBar = new InputBar();
    let game = new Game(1);

    setInterval(() => {
        game.display(screen);
        inputBar.display(screen);
        screen.update();
    }, 33);

    setInterval(() => {
        game.update();
    }, 250);

})();