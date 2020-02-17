import Appearance from './Appearance';
import MapElement from './MapElement';

export default class Item extends MapElement{
    constructor(script) {
        super(script.name, script.appearance.image)

        if (script.position) {
            this.updatePosition(script.position.room, script.position.x, script.position.y, script.position.facing);
        }

        this.name = script.name;
        this.type = "item";
        this.appearance = new Appearance(script.appearance);
        this.static = script.static;
        this.description = script.description;

        this.updateImage(this.appearance.imageName);
    }
}