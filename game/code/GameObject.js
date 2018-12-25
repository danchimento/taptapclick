import Appearance from "./Appearance";
import MapElement from "./MapElement";
import Inventory from "./Inventory";

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

        if (script.inventory) {
            this.inventory = new Inventory(script.inventory)
        }

        this.state = script.state;
        this.updateImage(this.appearances[0].imageName);
    }

    setState(state, map) {
        this.state = state;
        this.show();

        for (var appearance of this.appearances) {
            if (appearance.conditions && !map.testConditions(appearance.conditions)) {
                continue;
            }

            this.updateImage(appearance.imageName);
            return;
        }

        this.hide();
    }
}