import Screen from "../graphic/Screen"
import Displayable from "../graphic/Displayable";
import GameCommand from "../events/GameCommand";
import { EventNames } from "../events/Events";

export default class InputBar implements Displayable {
    private current_input: string = "";


    public constructor() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key.match(/^(\w|[.:,; ]){1}$/)) {
                this.current_input += event.key;
            } else if (event.keyCode === 8) {
                this.current_input = this.current_input.substr(0, this.current_input.length - 1);
            } else if (event.keyCode === 13) {
                let event: CustomEvent = new CustomEvent(EventNames.GameCommand, {
                    detail: {
                        command: this.current_input.toLowerCase()
                    }
                });
                document.dispatchEvent(event);
                this.current_input = "";
            }
            console.log(event.keyCode);
            console.log(event.key);
        });
    }

    public display(screen: Screen) {
        screen.put(0, 23, "=".repeat(40));
        let input_text = this.current_input + (" ".repeat(38 - this.current_input.length));
        let input_line = `>${input_text}<`;
        screen.put(0, 24, input_line);
    }


}