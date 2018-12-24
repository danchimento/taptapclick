import Appearance from "./Appearance";
import MapElement from "./MapElement";

export default class GameObject extends MapElement
{
    constructor(script) {
        super(script.name, script.appearance[0].image)

        this.updatePosition(script.position.room, script.position.x, script.position.y, script.position.orientation);

        this.name = script.name;
        this.type = "object";
        this.appearances = [];
        
        for (var scriptAppearance of script.appearance) {
            var appearance = new Appearance(scriptAppearance);
            this.appearances.push(appearance);
        }

        this.state = script.state;
        this.updateImage(this.appearances[0].imageName);
    }

    setState(state, map) {
        this.state = state;

        for (var appearance of this.appearances) {
            if (!appearance.conditions || !map.testConditions(appearance.conditions)) {
                continue;
            }

            this.updateImage(appearance.imageName);
        }
    }
}