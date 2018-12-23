import ImageLibrary from './ImageLibrary'
import Position from './Position';

export default class MapElement {
    constructor(room, x, y, image) {

        xInt = parseInt(x);
        yInt = parseInt(y);

        this.position = new Position(room, xInt, yInt);
        this.id = `${xInt}-${yInt}`;
        this.drawOrder = xInt + yInt;
        this.image = ImageLibrary[image];
    }

    updatePosition(x, y) {
        this.x = parseInt(x);
        this.y = parseInt(y);
    }

    updateImage(image) {
        this.iamge = ImageLibrary[image];
    }
}