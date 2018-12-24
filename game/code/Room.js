import GridElement from './MapElement'
import MapElement from './MapElement';

export default class Room
{
    constructor(script) {
        this.name = script.name;
        this.floor = script.floor;
        this.mapElements = [];
        this.floorElements = [];

        for (var i in script.layout) {
            for (var j in script.layout[i]) {
                var floorElement = new MapElement(`floor ${j}-${i}`, this.floor);
                floorElement.updatePosition(this.name, parseInt(j) + 1, parseInt(i) + 1, null);
                this.floorElements.push(floorElement);

                var image = script.layout[i][j];
                if (!image) {
                    continue;
                }

                var mapElement = new MapElement(`wall ${j}-${i}`, image)
                mapElement.updatePosition(this.name, parseInt(j) + 1, parseInt(i) + 1, null);
                this.mapElements.push(mapElement);
            }
        }
        
        this.mapElements.sort((a, b) => a.drawOrder - b.drawOrder);
    }
}