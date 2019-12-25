import DynamicObject from "./DynamicObject";
import Map from "../../../map/Map";
import Field from "../../../map/Field";

export default class Rat extends DynamicObject {
    field: Field = null;
    display_character: string = 'r';
    life: number = 10;

    constructor(field: Field) {
        super();
        this.field = field;
        this.life = 10;
    }

    public update(map: Map): boolean {
        if (this.life <= 0) {
            this.remove();
            return false;
        }
        this.move_random(map);
        return true;
    };
}
