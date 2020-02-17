import BaseScene from "./BaseScene";

export default class MainMenuScene extends BaseScene {
    constructor() {
        super('mainmenu');
    }

    preload() {

    }

    create() {
        this.setBackgroundColor("#4A4D67");

        this.addText('Locked', 180, 6);
        this.addText('A puzzle game by CHIMENTO', 36, 8);

        this.addSeparator(200, 11);
        this.addMenuButton('Start', 74, 12, () => this.scene.start("game"));
    }
}