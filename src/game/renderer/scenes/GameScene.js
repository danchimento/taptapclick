import Game from '../../code/Game.js';
import GameRenderer from '../GameRenderer.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }

    preload() {
        this.load.atlas('map', 'map/map.png', 'map/map.json');
        this.load.setBaseURL('/resources');
    }

    create() {
        var scale = Math.min(window.document.body.offsetWidth / 500, 1.5);
        var game = new Game();
        var renderer = new GameRenderer(game, this, scale);
        renderer.render();
    }
}