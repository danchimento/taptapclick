import GridElement from './MapElement'
import MapElement from './MapElement';

export default class Room
{
    constructor(script) {
        this.name = script.name;
        this.mapElements = [];

        for (var i in script.layout) {
            for (var j in script.layout[i]) {
                var mapElement = new MapElement(this.name, parseInt(j) + 1, parseInt(i) + 1, script.layout[i][j])
                this.mapElements.push(mapElement);
            }
        }
        
        this.mapElements.sort((a, b) => a.drawOrder - b.drawOrder);
    }
}