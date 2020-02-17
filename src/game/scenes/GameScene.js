import Game from '../code/Game.js';
//import GameRenderer from '../GameRenderer.js';
import level1 from '../maps/01_the_key.json';
import BaseScene from './BaseScene.js';

export default class GameScene extends BaseScene {
    constructor() {
        super('game');
    }

    preload() {
        this.load.atlas('map', 'map/map.png', 'map/map.json');
        this.load.setBaseURL('/resources');
    }

    create() {
        this.scale = Math.min(window.document.body.offsetWidth / 500, 1.5);

        this.tileWidth = 64;
        this.tileHeight = 64;

        var levels = [
            level1
        ]

        var  game = new Game();
        game.init(levels);
        game.start();

        this.map = game.currentMap;

       // var renderer = new GameRenderer(game, this, scale);
        this.update();
    }

    update() {
        this.render();

        if (this.map.levelComplete) {
            setTimeout(() => this.scene.start("levelcomplete"), 2000);
        }
    }

    render() {
        this.clear();

        this._renderFloor();
        this._renderMapElements();
        this._renderObjects();
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

    _renderMessage() {
        this.drawText(30, 600 * this.scale, this.map.message);
    }

    _renderInventory() {
        var itemsWidth = this.map.inventory.items.length * (64 * this.scale);

        // TODO: Figure out where these come from
        var itemsX = ((this.game.config.width * this.scale) / 2) - (itemsWidth / 2);
        var itemsY = (this.game.config.width * this.scale) + (200 * this.scale);

        for (var i = 0; i < this.map.inventory.items.length; i++) {
            var item = this.map.inventory.items[i];
            var x = itemsX + (i * (64 * this.scale));

            if (this.map.inventory.selectedItem == item) {
                this.drawCircle(x, itemsY, (32 * this.scale), "#fff")
            }

            var image = this.drawImage(x, itemsY, item.imageName);

            this.setOnTap(image, () => {
                this.map.selectItem(item);
                this.update();
            });
        }
    }

    _setObjectOnTap(tile, object) {
        this.setOnTap(tile, () => {
            this.map.trigger('tap', object.id);
            this.update();
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