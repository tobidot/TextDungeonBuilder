import Displayable from "../graphic/Displayable";
import Screen from "../graphic/Screen";
import InputBar from "../ui/InputBar";
import GameCommand from "../events/GameCommand";
import { EventNames } from "../events/Events";

export default class SpecialDisplay implements Displayable {
    private disappear_time_stamp: number | boolean;

    public constructor() {
        document.addEventListener(EventNames.GameCommand, (event: GameCommand) => {
            if (event.detail.command === 'game') {
                this.disable();
            }
        });
    }

    public setup(seconds: number | boolean) {
        if (typeof seconds === "boolean") {
            this.disappear_time_stamp = seconds;
        } else {
            this.disappear_time_stamp = performance.now() + seconds * 1000;
        }
    }

    public display(screen: Screen) {
        if (this.disappear_time_stamp === false || performance.now() < this.disappear_time_stamp) {
            this.special_display(screen);
        } else if (this.disappear_time_stamp !== true) {
            this.disable();
        }
    }

    public special_display(screen: Screen) { };
    public disable() { this.disappear_time_stamp = true; };
}
