import Game from './game/code/Game.js';
import MapLoader from './MapLoader.js';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#FFFFFF",
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var ui = new Phaser.Game(config);

function preload() {
    this.load.atlas('map', 'map/map.png', 'map/map.json');
    this.load.setBaseURL('/resources');
}

function create() {
    //ui.stage.backgroundColor = "#FFFFFF";

    var frames = this.textures.get('map').getFrameNames();

    var mapWidth = 10;
    var mapHeight = 10;

    var tileWidth = 50;
    var tileHeight = 50;

    var mapLoader = new MapLoader();
    var game = new Game(mapLoader.levels);

    game.start();

    for (var y = 0; y < mapHeight; y++) {
        for (var x = 0; x < mapWidth; x++) {
            var block = 'block-000';

            var tile = this.add.image(x * tileWidth, y * tileHeight, 'map', block);

            tile.setData('row', x);
            tile.setData('col', y);

            tile.setDepth(0);
        }
    }
}

