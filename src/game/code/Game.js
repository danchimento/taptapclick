import Map from './Map';

export default class Game {

    constructor() {
        this.levels = [];
        this.playing = false;
        this.levelComplete = false;
    }

    init(levels) {
        for (var level of levels) {
            this.addLevel(level)
        }
    }

    loadData(data) {
        if (!data || !data.levels) {
            return
        }

        for (var level of data.levels) {
            var matchingLevel = this.levels.find(l => l.name == level.name);
            if (level.completed) {
                matchingLevel.completed = true;
            }
        }
    }

    getSaveData() {
        return {
            levels: this.levels.map(l => {
                return {
                    name: l.name,
                    completed: l.completed
                }
            })
        }
    }

    start() {
        for (var level of this.levels) {
            if (!level.completed) {
                this.startLevel(level.name);
                return;
            }
        }

        // If all the levels are completed
        this.startLevel(this.levels[0].name)
    }

    stop() {
        this.playing = false;
        this.levelComplete = false;
    }

    addLevel(script) {
        var map = new Map(script);
        map.completed = false;
        
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

        // This value is used for saving to the device
        this.currentMap.completed = true;

        if (this.onUpdateGameState) {
            setTimeout(this.onUpdateGameState, 2000)
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