import level1 from '../maps/01_the_key.json';

export default class GameRenderer {
    constructor(game, ui) {
        this.game = game;
        this.ui = ui;

        this.tileWidth = 100;
        this.tileHeight = 100;

        var levels = [
            level1
        ]
        
        this.game.init(levels);
        this.game.start();
    }

    render() {
        for (var floorElement of this.game.currentMap.currentRoom.floorElements) {
            this._renderMapElement(floorElement, false, 0);
        }

        for (var mapElement of this.game.currentMap.currentRoom.mapElements) {
            this._renderMapElement(mapElement, true);
        }

        for (var gameObject of this.game.currentMap.getVisbleGameObjects()) {
            this._renderMapElement(gameObject, true);
        }
    }

    _renderMapElement(element, interactive, depth) {
        var tile = this.ui.add.image(element.position.x * 64, element.position.y * 64, 'map', this._frameName(element.imageName, element.orientation));
        tile.setData('row', element.position.x);
        tile.setData('col', element.position.y);

        tile.setDepth(depth != null ? depth : (element.position.x + element.position.y));
        
        if (interactive) {
            tile.setInteractive();
            tile.on('pointerdown', () => {
                this.game.currentMap.trigger('tap', element.id);
            });
        }

        element.updateImage = (image) => {
            tile.setFrame(this._frameName(image, element.orientation));
        }
    }

    _frameName(image, orientation) {
        var imageName = image;
        if (orientation) {
            imageName += `-${orientation}`;
        }

        return imageName;
    }
}