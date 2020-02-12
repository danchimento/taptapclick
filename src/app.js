import Game from './game/code/Game.js';
import GameRenderer from './game/renderer/GameRenderer.js';

var game = new Game();

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    backgroundColor: "#FFFFFF",
    physics: {
        default: 'arcade',
    },
    scene: {
        preload: function() {
            this.load.atlas('map', 'map/map.png', 'map/map.json');
            this.load.setBaseURL('/resources');
        },
        create: function() {
            var renderer = new GameRenderer(game, this);
            renderer.render();
        }
    }
};


var ui = new Phaser.Game(config);



