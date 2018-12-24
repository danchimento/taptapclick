import ImageLibrary from './ImageLibrary'
import Position from './Position';

export default class MapElement {
    constructor(room, x, y, orientation, image) {

        xInt = parseInt(x);
        yInt = parseInt(y);

        this.position = new Position(room, xInt, yInt);
        this.id = `${xInt}-${yInt}`;
        this.drawOrder = xInt + yInt;
        this.orientation = !orientation || !orientation.length ? "west" : orientation;
        this.image = ImageLibrary[image][this.orientation];
    }

    updatePosition(x, y) {
        this.x = parseInt(x);
        this.y = parseInt(y);
    }

    updateImage(image) {
        this.image = ImageLibrary[image][this.orientation];
    }
}