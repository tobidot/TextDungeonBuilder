import SpecialDisplay from "./SpecialDisplay";
import Screen from "../graphic/Screen";
import { Rect } from "../utils/SimpleShapes";

export default class Credits extends SpecialDisplay {
    special_display(screen: Screen) {
        screen.fill(Rect.from_boundries(5, 5, 35, 20), ' ');
        screen.border(Rect.from_boundries(5, 5, 35, 20));
        screen.put(11, 6, 'Credits');
        screen.put(6, 9, 'I have created this Project');
        screen.put(6, 10, 'by myself and own');
        screen.put(6, 11, 'all the credits for it.');
        screen.put(12, 13, '(Tobias Gepp)');
        screen.put(8, 18, 'Type "game" to continue.');
    }
}