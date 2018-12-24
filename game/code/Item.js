import ImageLibrary from './ImageLibrary';
import Appearance from './Appearance';
import MapElement from './MapElement';

export default class Item extends MapElement{
    constructor(script) {
        super(script.name, script.position.room, script.position.x, script.position.y, script.position.facing, script.appearance.image)

        this.name = script.name;
        this.type = "item";
        this.appearance = new Appearance(script.appearance);

        this.updateImage(this.appearance.imageName);
    }
}