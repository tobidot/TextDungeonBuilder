import { PlayerOrders } from "./GameEnums";
import GameCommand from "../events/GameCommand";
import { EventNames } from "../events/Events";


export default class Player {
    public gold: number;
    public orders: string[];

    public constructor() {
        this.orders = [PlayerOrders[0], PlayerOrders[1], PlayerOrders[2]];
        this.gold = 0;
        document.addEventListener(EventNames.GameCommand, (event: GameCommand) => {
            let command: string = event.detail.command.toUpperCase();
            let command_position = 0;
            let command_parts = command.match(/^([123])? *(.*)$/);
            if (command_parts) {
                if (command_parts[1]) command_position = parseInt(command_parts[1]) - 1;
                command = command_parts[2];
            }

            let index = PlayerOrders.indexOf(command);
            if (index !== -1) {
                this.orders[command_position] = command;
            }
        })
    }
}