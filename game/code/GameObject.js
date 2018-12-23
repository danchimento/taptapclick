import Appearance from "./Appearance";
import MapElement from "./MapElement";

export default class GameObject extends MapElement
{
    constructor(script) {
        super(script.position.room, script.position.x, script.position.y, script.appearance[0].image)

        this.name = script.name;
        this.state = script.state;
        this.appearance = [];
        
        for (var scriptAppearance of script.appearance) {
            var appearance = new Appearance(scriptAppearance);
            this.appearance.push(appearance);
        }
    }
}