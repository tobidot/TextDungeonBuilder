import { FieldBaseTypesCharacters } from "../game/GameEnums";

export interface RoomTemplate {
    base: string[];
    static: string[];
    dynamic: string[];
    description: string;
    rarity: number;
}
