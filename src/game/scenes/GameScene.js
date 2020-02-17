import Game from '../code/Game.js';
import BaseScene from './BaseScene.js';

export default class GameScene extends BaseScene {
    constructor() {
        super('game');
    }

    init(data){
        this.level = data.level;
    }

    preload() {
        this.load.atlas('map', './resources//map/map.png', './resources/map/map.json');
    }

    create() {
        this.scale = 1.3;

        this.addMenuButton("Menu", 50, 23, () => this.scene.start("mainmenu"));

        this.tileWidth = 64;
        this.tileHeight = 64;

        var levels = [
            this.level
        ]

        var game = new Game();
        game.init(levels);
        game.start();

        this.map = game.currentMap;

        this._update();
    }

    _update() {
        this._render();

        if (this.map.levelComplete) {
            setTimeout(() => this.scene.start("levelcomplete"), 2000);
        }
    }

    _render() {
        this.clear();

        this._renderFloor();
        this._renderMapElements();
        this._renderObjects();
        this._renderItems();
        this._renderInventory();
        this._renderMessage();
    }

    _renderFloor() {
        for (var floorElement of this.map.currentRoom.floorElements) {
            this.drawTile(floorElement.position.x, floorElement.position.y, floorElement.imageName, 0);
        }
    }

    _renderMapElements() {
        for (var mapElement of this.map.currentRoom.mapElements) {
            this.drawTile(mapElement.position.x, mapElement.position.y, mapElement.imageName);
        }
    }

    _renderObjects() {
        for (var gameObject of this.map.getVisbleGameObjects()) {
            var tile = this.drawTile(gameObject.position.x, gameObject.position.y, this._frameName(gameObject.imageName, gameObject.orientation));
            this._setObjectOnTap(tile, gameObject)
        }
    }

    _renderItems() {
        for (var item of this.map.getVisibleItems()) {
            var tile = this.drawTile(item.position.x, item.position.y, this._frameName(item.imageName, item.orientation));
            this._setItemOnTap(tile, item)
        }
    }

    _renderMessage() {
        this.drawText(30, this._posToPix(14), this.map.message);
    }

    _renderInventory() {
        var itemsWidth = (this.map.inventory.items.length - 1) * (64 * this.scale);

        // Draw inventory box
        var rect = this.drawRectangle(this.game.config.width / 2, this._posToPix(18), this.game.config.width - 100, 200, 0xCCCCCC);
        rect.setOrigin(.5);

        var itemsX = ((this.game.config.width) / 2) - (itemsWidth / 2);
        var itemsY = rect.y;
        var itemPadding = 10;

        if (this.map.inventory.items.length == 0) {
            this.drawText(rect.x, rect.y, "Inventory is empty", "#DDD");
        } else {
            for (var i = 0; i < this.map.inventory.items.length; i++) {
                var item = this.map.inventory.items[i];

                var x = itemsX + (i * (64 * this.scale)) + (i * itemPadding);

                if (this.map.inventory.selectedItem == item) {
                    this.drawCircle(x, itemsY, 64, 0xB04A31)
                }

                var image = this.drawImage(x, itemsY, item.imageName, 1, 1);
                image.setOrigin(.5);
                image.angle = 45;

                ((item) => this.setOnTap(image, () => {
                    this.map.selectItem(item);
                    this._update();
                }))(item);
            }
        }
    }

    _setObjectOnTap(tile, object) {
        this.setOnTap(tile, () => {
            this.map.trigger('tap', object.id);
            this._update();
        });
    }

    _setItemOnTap(tile, object) {
        this.setOnTap(tile, () => {
            this.map.pickUpItem(object.id);
            this._update();
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