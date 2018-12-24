import Appearance from "./Appearance";
import MapElement from "./MapElement";

export default class GameObject extends MapElement
{
    constructor(script) {
        super(script.position.room, script.position.x, script.position.y, script.position.facing, script.appearance[0].image)

        this.name = script.name;
        this.appearances = [];
        
        for (var scriptAppearance of script.appearance) {
            var appearance = new Appearance(scriptAppearance);
            this.appearances.push(appearance);
        }

        this.setState(script.state);
    }

    setState(state) {
        this.state = state;

        for (var appearance of this.appearances) {
            if (appearance.stateCondition && appearance.stateCondition == this.state) {
                this.updateImage(appearance.imageName);
            }
        }
    }
}