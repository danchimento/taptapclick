import ImageLibrary from './ImageLibrary'
import Position from './Position';

export default class MapElement {
    constructor(id, room, x, y, orientation, image) {

        xInt = parseInt(x);
        yInt = parseInt(y);

        this.position = new Position(room, xInt, yInt);
        this.id = id ? id : `${xInt}-${yInt}`;
        this.drawOrder = xInt + yInt;
        this.orientation = orientation;

        this.updateImage(image);
    }

    updatePosition(x, y) {
        this.x = parseInt(x);
        this.y = parseInt(y);
    }

    updateImage(image) {
        var libraryImage = ImageLibrary[image];
        if (libraryImage && libraryImage.url) {
            this.image = libraryImage;
        } else {
            this.image = libraryImage[this.orientation];
        }
    }
}