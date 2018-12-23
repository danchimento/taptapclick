import Map from './Map';

export default class Game {

    constructor() {
        this.maps = [];
    }

    init() {
        
    }

    addMap(script) {
        var map = new Map(script);
        
        this.maps.push(map);
    }

    startMap(mapName) {
        for (var map of this.maps) {
            if (map.name === mapName) {
                this.currentMap = map;
                return;
            }
        }
    }
}