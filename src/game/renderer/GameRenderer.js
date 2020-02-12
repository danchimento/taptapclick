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
            this._renderMapElement(floorElement, 0);
        }

        for (var mapElement of this.game.currentMap.currentRoom.mapElements) {
            this._renderMapElement(mapElement, 1);
        }
    }

    _renderMapElement(element, depth) {
        var tile = this.ui.add.image(element.position.x * 64, element.position.y * 64, 'map', element.imageName);
        tile.setData('row', element.position.x);
        tile.setData('col', element.position.y);
        tile.setDepth(depth);
    }
}