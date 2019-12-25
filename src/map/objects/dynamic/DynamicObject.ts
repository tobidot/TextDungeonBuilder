import Map from "../../../map/Map";
import Field from "../../../map/Field";
import { FieldBaseTypes } from "../../../game/GameEnums";
import { Point } from "../../../utils/SimpleShapes";

export default class DynamicObject {
    field: Field;
    display_character: string;

    public update(map: Map): boolean {
        return true;
    };

    remove() {
        if (this.field.dynamic_object === this) this.field.dynamic_object = null;
    }

    can_move_to(field: Field) {
        return (field.static_object === null
            && field.dynamic_object === null
            && field.field_base_type !== FieldBaseTypes.LAVA
            && field.field_base_type !== FieldBaseTypes.WATER);
    }

    move_to(field: Field): boolean {
        if (this.can_move_to(field)) {
            if (this.field.dynamic_object === this) this.field.dynamic_object = null;
            this.field = field;
            this.field.dynamic_object = this;
            return true;
        }
        return false;
    }

    move_to_either(fields: Field[]): boolean {
        let possible_fields = fields.filter((field: Field) => this.can_move_to(field));
        if (possible_fields.length === 0) return false;
        const random_index = Math.trunc(Math.random() * possible_fields.length);
        return this.move_to(possible_fields[random_index]);
    }

    move_random(map: Map) {
        let random_direction = Point.create_random_direction();
        let new_field = map.get(this.field.x + random_direction.x, this.field.y + random_direction.y);
        this.move_to(new_field);
    }


}