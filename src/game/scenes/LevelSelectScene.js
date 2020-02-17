import BaseScene from "./BaseScene";
import level1 from '../maps/01_the_key.json';
import level2 from '../maps/02_the_book.json';
import level3 from '../maps/03_the_library.json';

export default class LevelSelectScene extends BaseScene {
    constructor() {
        super('levelselect');
    }

    preload() {
        this.levels = [level1, level2, level3]
    }

    create() {
        this.setBackgroundColor("#658973");
        this.addText('Select a level', 100, 5);

        this.addSeparator(400, 7);

        for (var i = 0; i < this.levels.length; i++) {
            var level = this.levels[i];
            this.addMenuButton(`${i + 1}. ${level.map.name}`, 74, (i * 2) + 9, this._getLevelStartEvent(level));
        }

        this.addMenuButton("Menu", 50, 23, () => this.scene.start("mainmenu"));
    }

    _getLevelStartEvent(level) {
        return () => this.scene.start("game", { level: level });
    }
}