import level1 from '../maps/01_the_key.json';
import InventoryRenderer from './InventoryRenderer';
import Renderer from './Renderer';

export default class GameRenderer extends Renderer {
    constructor(game, ui, scale) {
        super(ui, scale);

        this.game = game;
        this.ui = ui;

        this.tileWidth = 64;
        this.tileHeight = 64;

        var levels = [
            level1
        ]
        
        this.game.init(levels);
        this.game.start();

        this.inventoryRenderer = new InventoryRenderer(ui, scale, this.game.currentMap.inventory);
        this.inventoryRenderer.onItemSelected = (item) => {
            this.game.currentMap.selectItem(item);
            this.render();
        }
    }

    render() {
        this.clear();

        this._renderFloor();
        this._renderMapElements();
        this._renderObjects();
        this.inventoryRenderer.render();
        this._renderMessage();
    }

    _renderFloor() {
        for (var floorElement of this.game.currentMap.currentRoom.floorElements) {
            this.drawTile(floorElement.position.x, floorElement.position.y, floorElement.imageName, 0);
        }
    }

    _renderMapElements() {
        for (var mapElement of this.game.currentMap.currentRoom.mapElements) {
            this.drawTile(mapElement.position.x, mapElement.position.y, mapElement.imageName);
        }
    }

    _renderObjects() {
        for (var gameObject of this.game.currentMap.getVisbleGameObjects()) {
            var tile = this.drawTile(gameObject.position.x, gameObject.position.y, this._frameName(gameObject.imageName, gameObject.orientation));
            this._setObjectOnTap(tile, gameObject)
        }
    }

    _renderMessage() {
        this.drawText(30, 600 * this.scale, this.game.currentMap.message);
    }

    _setObjectOnTap(tile, object) {
        this.setOnTap(tile, () => {
            this.game.currentMap.trigger('tap', object.id);
            this.render();
        });
    }

    _frameName(image, orientation) {
        var imageName = image;
        if (orientation) {
            imageName += `-${orientation}`;
        }

        return imageName;
    }
}