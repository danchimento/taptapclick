import Game from './game/code/Game.js';
import GameRenderer from './game/renderer/GameRenderer.js';

var game = new Game();

var scale = Math.min(window.document.body.offsetWidth / 500, 1.5);

var config = {
    type: Phaser.AUTO,
    width: 500 * scale,
    height: 1000 * scale,
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
            var renderer = new GameRenderer(game, this, scale);
            renderer.render();
        }
    }
};

var ui = new Phaser.Game(config);

window.document.body.style.width = "100%";
window.document.body.style.textAlign = "center";

