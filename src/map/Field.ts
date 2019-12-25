import { FieldBaseTypes, FieldBaseTypesCharacters } from "../game/GameEnums";
import DynamicObject from "./objects/dynamic/DynamicObject";
import StaticObject from "./objects/static/StaticObject";
import Wall from "./objects/static/Wall";
import { RoomTemplate } from "./MapFactory";

export default class Field {
    private static room_templates: RoomTemplate[];

    public readonly x: number;
    public readonly y: number;
    public readonly index: number;
    public unseen: boolean;
    public display_character: string;
    public field_base_type: FieldBaseTypes;
    public dynamic_object: DynamicObject | null;
    public static_object: StaticObject | null;

    public constructor(x: number, y: number, index: number) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.unseen = true;
        this.set_base_type(FieldBaseTypes.DIRT);
        this.dynamic_object = null;
        this.static_object = null;
    }

    public reveal(): void {
        this.unseen = false;
    }

    public initialize(seed: number) {
        let base_x = Math.trunc(this.x / 10);
        let base_y = Math.trunc(this.y / 10);
        let distance_to_center = Math.trunc(Math.sqrt(Math.pow(base_x, 2) + Math.pow(base_y, 2)));
        let field_base_type = Math.abs(Math.round(Math.sin(distance_to_center + seed) * FieldBaseTypes.MAX)) % FieldBaseTypes.MAX;
        this.unseen = true;


        let normal = Math.cos(this.index + seed);
        if (normal < 0.75) {
            this.set_base_type(field_base_type);
        } else {
            this.set_base_type(Math.round((normal - 0.75) * 4 * FieldBaseTypes.MAX) % FieldBaseTypes.MAX);
        }

        this.static_object = new Wall();
    }

    public set_base_type(type: FieldBaseTypes) {
        this.field_base_type = type;

        this.display_character = FieldBaseTypesCharacters[type];
        this.field_base_type = type;
    }
}