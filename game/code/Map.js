import Room from './Room';

export default class Map 
{
    constructor(script) {
        this.name = script.name
        this.rooms = [];
        this.behaviors = [];
        this.gameObjects = [];
        this.inventory = [];
        this.items = [];
    }

    init () {
        
    }

    _parseScript(script) {
        for (roomScript of script.rooms) {
            var room = new Room(roomScript);
            this.rooms.push(room);
        }
    }
}