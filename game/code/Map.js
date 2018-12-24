import Room from './Room';
import GameObject from './GameObject'
import Behavior from './Behavior';

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

    trigger(type, target) {

        behaviorsToExecute = [];

        for (var behavior of this.behaviors) {
            if (behavior.target == target) {
                if (this._testConditions(behavior.conditions)) {
                    behaviorsToExecute.push(behavior);
                }
            }
        }

        for (var behavior of behaviorsToExecute) {
            this._performActions(behavior.actions);
        }
    }
    
    _performActions(actions) {
        for (var action of actions) {
            this._performAction(action);
        }
    }

    _performAction(action) {

        // State change actions
        if (action.state) {
            var targetObject = this._getGameObject(action.target);
            targetObject.setState(action.state);
        }

        // Give item actions

        // End game actions
    }

    _testConditions(conditions) {
        for (var condition of conditions) {
            if (!this._testCondition(condition)) {
                return false;
            }
        }

        return true;
    }

    _testCondition(condition) {

        // Test state
        if (condition.state) {
            var target = this._getGameObject(condition.target);
            if (condition.state != target.state) {
                return false;
            }
        }

        // Test Received Item

        return true;
    }

    _getGameObject(name) {
        return this.gameObjects.find(go => go.name == name);
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

        for (var behaviorScript of script.behaviors) {
            var behavior = new Behavior(behaviorScript);
            this.behaviors.push(behavior);
        }

        this.gameObjects.sort((a, b) => a.drawOrder - b.drawOrder);

        this.currentRoom = this.rooms[0];
    }
}