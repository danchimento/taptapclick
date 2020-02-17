import './app.css';
import GameScene from './game/scenes/GameScene.js';
import MainMenuScene from './game/scenes/MainMenuScene.js';
import LevelCompleteScene from './game/scenes/LevelCompleteScene.js';
import LevelSelectScene from './game/scenes/LevelSelectScene';

var scale = Math.min(window.document.body.offsetWidth / 500, 1);

var config = {
    type: Phaser.AUTO,
    width: 950 * scale,
    height: 1700 * scale,
    backgroundColor: "#2B4570",
    physics: {
        default: 'arcade',
    },
    scene: [ MainMenuScene, LevelSelectScene, GameScene, LevelCompleteScene ]
};

var ui = new Phaser.Game(config);

window.document.body.style.width = "100%";
window.document.body.style.textAlign = "center";

