export default interface GameCommand extends Event {
    readonly detail: {
        command: string;
    }
}

