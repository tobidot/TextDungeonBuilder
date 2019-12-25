import Screen from "./Screen";

export default interface Displayable {
    display: (screen: Screen) => void
}