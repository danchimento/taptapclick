export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'mainmenu' });
    }

    preload() {

    }

    create() {

        var text = this.add.text(window.document.body.offsetWidth / 2, window.document.body.offsetHeight / 2, "Start", {
            fontFamily: 'Abril', 
            align: 'center',
            fontSize: 52, 
            color: '#EDECE1',
        });

        text.setInteractive();
        text.on("pointerdown", () => this.scene.start("game"));

        text.setOrigin(.5);
    }
}