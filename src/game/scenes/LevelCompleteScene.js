import BaseScene from "./BaseScene";

export default class LevelCompleteScene extends BaseScene {
    constructor() {
        super('levelcomplete');
    }

    preload() {

    }

    create() {
        this.setBackgroundColor("#B0733B");
        this.addText('Nice.', 160, 8);
        this.addSeparator(350, 13);
        this.addMenuButton('Continue', 74, 14, () => this.scene.start("game"));
    }
}