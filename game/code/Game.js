import Map from './Map';

export default class Game {

    constructor() {
        this.levels = [];

        this.addLevel(require('../../game/maps/map1.json'));
        this.addLevel(require('../../game/maps/map2.json'));
        this.addLevel(require('../../game/maps/map3.json'));

        this.playing = false;
        this.levelComplete = false;
    }

    init() {
        
    }

    start() {
        this.startLevel(this.levels[0].name)
    }

    stop() {
        this.playing = false;
        this.levelComplete = false;
    }

    addLevel(script) {
        var map = new Map(script);
        
        this.levels.push(map);
    }

    nextLevel() {
        var index = this.levels.indexOf(this.currentMap);

        if (this.levels.length <= ++index) {
            this.stop();
            return;
        }

        var nextLevel = this.levels[index];
        this.startLevel(nextLevel.name);
    }

    handleWin() {
        this.playing = false;
        this.levelComplete = true;

        if (this.onUpdateGameState) {
            this.onUpdateGameState();
        }
    }

    startLevel(mapName) {
        for (var map of this.levels) {
            if (map.name === mapName) {
                this.currentMap = map;
                this.currentMap.init();
                this.currentMap.onWin = () => this.handleWin()

                break;
            }
        }

        this.levelComplete = false;
        this.playing = true;
    }
}