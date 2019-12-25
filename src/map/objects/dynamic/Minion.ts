import DynamicObject from "./DynamicObject";
import Field from "../../../map/Field";
import Player from "../../../game/Player";
import Map from "../../../map/Map";
import { Rect, Point } from "../../../utils/SimpleShapes";
import Rat from "./Rat";
import Wall from "../static/Wall";

export default class Minion extends DynamicObject {
    player: Player = null;
    field: Field = null;
    display_character: string = '@';

    public constructor(field: Field, player: Player) {
        super();
        this.player = player;
        this.field = field;
    }

    public update(map: Map): boolean {

        let surround_rect = Rect.from_point_with_size(new Point(this.field.x + 0.5, this.field.y + 0.5), 3, 3);
        const surround = map.get_within_bounds(surround_rect);
        surround.forEach((field: Field) => field.unseen = false);
        for (let order of this.player.orders) {
            if (order in this.orders) {
                let success = (this.orders)[order](map, surround);
                if (success) return true;
            }
        }
        return true;
    };

    orders: { [name: string]: (map: Map, fields: Field[]) => boolean } = {
        SEARCH: (map: Map, surround: Field[]) => {
            const success = this.move_to_either(surround);
            return success;
        },
        ATTACK: (map: Map, surround: Field[]) => {
            const success = surround.reduce((success, field) => {
                if (success || field === this.field) return success;

                if (field.dynamic_object instanceof Rat) {
                    field.dynamic_object.life -= 5;
                    if (field.dynamic_object.life <= 0) {
                        this.player.gold += 5;
                    }
                    return true;
                }
            }, false);
            return success;
        },
        DIG: (map: Map, surround: Field[]) => {
            const success = surround.reduce((success, field) => {
                if (success || field === this.field) return success;

                if (field.static_object instanceof Wall) {
                    field.static_object = null;
                    return true;
                }
            }, false);
            return success;
        },
        WEST: (map: Map, surround: Field[]) => {
            let reduced_fields = surround.filter((field: Field) => {
                return field.x <= this.field.x;
            });
            return this.move_to_either(reduced_fields);
        },
        EAST: (map: Map, surround: Field[]) => {
            let reduced_fields = surround.filter((field: Field) => {
                return field.x >= this.field.x;
            });
            return this.move_to_either(reduced_fields);
        },
        NORTH: (map: Map, surround: Field[]) => {
            let reduced_fields = surround.filter((field: Field) => {
                return field.y <= this.field.y;
            });
            return this.move_to_either(reduced_fields);
        },
        SOUTH: (map: Map, surround: Field[]) => {
            let reduced_fields = surround.filter((field: Field) => {
                return field.y >= this.field.y;
            });
            return this.move_to_either(reduced_fields);
        }
    };

}