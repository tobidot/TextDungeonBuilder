import Displayable from "../graphic/Displayable";
import Map from "../map/Map";
import { Rect, Point } from "../utils/SimpleShapes";
import Screen from "../graphic/Screen";
import Field from "../map/Field";
import { FieldBaseTypes } from "./GameEnums";
import Credits from "../special_displays/Credtis";
import SpecialDisplay from "../special_displays/SpecialDisplay";
import Player from "./Player";
import GameCommand from "../events/GameCommand";
import { EventNames } from "../events/Events";
import DynamicObject from "../map/objects/dynamic/DynamicObject";
import Rat from "../map/objects/dynamic/Rat";
import Minion from "../map/objects/dynamic/Minion";

export default class Game implements Displayable {
    private map: Map;
    private camera_position: Point;
    private credits: Credits;
    private player: Player;
    private objects: Array<DynamicObject>;
    private frame_count: number = 0;

    public constructor(map_seed: number = 0) {
        const MAP_SEED = map_seed || Math.trunc(Math.random() * 1000000);

        this.frame_count = 0;
        this.objects = new Array<DynamicObject>();
        this.player = new Player();
        this.credits = new Credits();
        this.camera_position = new Point(0, 0);
        this.map = new Map();
        this.map.generate_area(new Point(0, 0));

        this.map.get_within_bounds(Rect.from_point_with_size(this.camera_position, 5, 5)).forEach((field: Field | false) => {
            if (field === false) return;
            field.set_base_type(FieldBaseTypes.DIRT);
            field.static_object = null;
            if (Math.random() < 0.1) {
                const rat = new Rat(field);
                field.dynamic_object = rat;
                this.objects.push(rat);
            }
        });

        for (let i = 0; i < 4; ++i) {
            let field = this.map.get(i - 2, 0);
            if (field === false) {
                throw new Error('Could not create starting Minions');
            }
            let minion = new Minion(field, this.player);
            field.dynamic_object = minion;
            this.objects.push(minion);
        }


        document.addEventListener("keydown", (event: KeyboardEvent) => {
            let speed = 1;
            if (event.getModifierState("Shift")) {
                speed = 10;
            }
            if (event.key === "ArrowLeft") {
                this.camera_position.x -= speed;
            } else if (event.key === "ArrowRight") {
                this.camera_position.x += speed;
            } else if (event.key === "ArrowUp") {
                this.camera_position.y -= speed;
            } else if (event.key === "ArrowDown") {
                this.camera_position.y += speed;
            }
        })
        document.addEventListener(EventNames.GameCommand, (event: GameCommand) => {
            switch (event.detail.command) {
                case 'credits':
                    this.credits.setup(false);
                    break;
            }
        });
    }

    public update() {
        this.update_dynamic_objects();
    }

    public display(screen: Screen): void {
        let frame_type = Math.trunc(performance.now() / 250) % 4;
        let fields = this.map.get_within_bounds(Rect.from_point_with_size(this.camera_position, 40, 25));
        for (let x = 0; x < 40; x++) {
            for (let y = 0; y < 25; y++) {
                let field: Field | false = fields[x + y * 40];
                this.display_field(screen, frame_type, x, y, field);
            }
        }
        this.display_ui(screen);
        this.credits.display(screen);
        this.frame_count++;
    }


    public display_field(screen: Screen, frame_type: number, x: number, y: number, field: Field | false) {
        if (field === false) {
            screen.put(x, y, 'X');
        } else if (field.unseen) {
            screen.put(x, y, '?');
        } else if (field.dynamic_object && (frame_type >= 0 || frame_type <= 4)) {
            screen.put(x, y, field.dynamic_object.display_character);
        } else if (field.static_object) {
            screen.put(x, y, field.static_object.display_character);
        } else {
            screen.put(x, y, field.display_character);
        }
    }

    /**
     * display_ui
     */
    public display_ui(screen: Screen) {
        screen.fill(Rect.from_boundries(30, 0, 40, 25), ' ');
        screen.fill(Rect.from_boundries(29, 0, 30, 25), '|');
        screen.put(32, 1, 'G ' + this.player.gold.toString());
        for (let i = 0; i < 3; i++) {
            screen.put(32, 10 + i * 2, this.player.orders[i]);
        }
        screen.put(32, 21, this.camera_position.x.toString() + " / " + this.camera_position.y);
    }

    public update_dynamic_objects() {
        if (Math.random() < 0.05) {
            let field = this.map.get(0, 0);
            if (field !== false) {
                if (field.dynamic_object === null) {
                    const rat = new Rat(field);
                    field.dynamic_object = rat;
                    this.objects.push(rat);
                }
            }
        }
        this.objects = this.objects.filter((object: DynamicObject) => {
            if (object.update(this.map)) {

            };
            return true;
        });
    }
}