import Room from './Room';
import GameObject from './GameObject'

export default class Map 
{
    constructor(script) {
        this.name = script.name
        this.rooms = [];
        this.behaviors = [];
        this.gameObjects = [];
        this.inventory = [];
        this.items = [];
        this.currentRoom = null;
        this._script = script;
    }

    init () {
        this._parseScript(this._script.map);
    }

    _parseScript(script) {
        for (roomScript of script.rooms) {
            var room = new Room(roomScript);
            this.rooms.push(room);
        }

        for (var gameObjectScript of script.gameObjects) {
            var gameObject = new GameObject(gameObjectScript);
            this.gameObjects.push(gameObject)
        }

        this.gameObjects.sort((a, b) => a.drawOrder - b.drawOrder);

        this.currentRoom = this.rooms[0];
    }
}