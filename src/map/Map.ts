import { Rect, Point } from "../utils/SimpleShapes";
import Field from "./Field";

export default class Map {
    private current_bounds: Rect;
    private fields: Array<Field> = [];

    public constructor() {
        this.current_bounds = Rect.from_point_with_size(new Point(0, 0), 10, 10);
    }

    public generate_area_around(position: Point): void {
        let area_x = Math.trunc(position.x / 10);
        let area_y = Math.trunc(position.y / 10);
        for (let y = -2; y <= 2; y++) {
            for (let x = -2; x <= 2; x++) {
                let field_x = (area_x + x) * 10;
                let field_y = (area_y + y) * 10;
                if (this.get(field_x, field_y) === false) {
                    this.generate_area(new Point(area_x + x, area_y + y));
                }
            }
        }
    }

    public generate_area(area: Point) {
        for (let y = -10; y < 10; y++) {
            for (let x = -10; x < 10; x++) {
                let field_x = (area.y) * 10 + x;
                let field_y = (area.x) * 10 + y;
                let field_id = this.xy_to_id(field_x, field_y);
                this.fields[field_id] = new Field(field_x, field_y, field_id);
                this.fields[field_id].initialize(0);
            }
        }

    }

    public get(x: number | Point, y: number): Field | false {
        if (x instanceof Point) {
            y = x.y;
            x = x.x;
        }
        const i = this.xy_to_id(x, y);
        if (typeof this.fields[i] !== "object") {
            return false;
        }
        return this.fields[i];
    }

    public get_within_bounds(bounds: Rect): Array<Field | false> {
        let result: Array<Field | false> = [];
        for (let y = Math.floor(bounds.top); y < Math.floor(bounds.bottom); ++y) {
            for (let x = Math.floor(bounds.left); x < Math.floor(bounds.right); ++x) {
                result.push(this.get(x, y));
            }
        }
        return result;
    }

    private xy_to_id(x: number, y: number): number {
        const px = Math.abs(x * 2) + (x < 0 ? 1 : 0);
        const py = Math.abs(y * 2) + (y < 0 ? 1 : 0);
        return this.positive_xy_to_id(px, py);
    }

    private positive_xy_to_id(x: number, y: number): number {
        let acc = 0;
        while ((x | y) > 0) {
            if (x > 0) acc += (x--) + y;
            else if (y > 0) acc += x + (y--) + 1;
        }
        return acc;
    }
}