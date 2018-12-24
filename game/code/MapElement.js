import ImageLibrary from './ImageLibrary'
import Position from './Position';

export default class MapElement {
    constructor(id, image) {
        this.id = id;
        this.imageName = image;
    }

    updatePosition(room, x, y, orientation) {
        this.orientation = orientation;

        xInt = parseInt(x);
        yInt = parseInt(y);
        
        this.position = new Position(room, xInt, yInt);
        this.drawOrder = xInt + yInt;

        this.updateImage(this.imageName);
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