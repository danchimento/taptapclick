import Room from './Room';
import GameObject from './GameObject'
import Behavior from './Behavior';
import Item from './Item';
import Inventory from './Inventory';

export default class Map 
{
    constructor(script) {
        this.name = script.name
        this.rooms = [];
        this.behaviors = [];
        this.gameObjects = [];
        this.inventory = new Inventory();
        this.items = [];
        this.currentRoom = null;
        this._script = script;
        this.message = "Escape the room!";
    }

    init () {
        this._parseScript(this._script.map);
    }

    trigger(type, target) {

        behaviorsToExecute = [];

        for (var behavior of this.behaviors) {
            if (behavior.target == target && behavior.trigger == type) {
                if (this.testConditions(behavior.conditions)) {
                    behaviorsToExecute.push(behavior);
                }
            }
        }

        for (var behavior of behaviorsToExecute) {
            this._performActions(behavior.actions);
        }
    }

    pickUpItem(itemId) {
        var item = this.items.find(i => i.name == itemId);

        if (!item) {
            return;
        }

        this.inventory.add(item);
    }

    getVisibleItems() {
        var visibleItems = [];

        for (var item of this.items) {
            if (!item.position || item.position.room != this.currentRoom.name) {
                continue;
            }

            if (!this.testConditions(item.appearance.conditions)) {
                continue;
            }

            visibleItems.push(item);
        }

        return visibleItems;
    }

    getVisbleGameObjects() {
        var visibleGameObjects = [];
  
        for (var gameObject of this.gameObjects) {
            if (gameObject.position.room != this.currentRoom.name) {
                continue;
            }
            
            visibleGameObjects.push(gameObject);
        }
  
        return visibleGameObjects;
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
            targetObject.setState(action.state, this);
        }

        // Message
        if (action.message) {
            this.message = action.message;
        }

        // Give item actions

        // End game actions
    }

    testConditions(conditions) {
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
            var gameObject = new GameObject(gameObjectScript, this);
            this.gameObjects.push(gameObject)
        }

        for (var behaviorScript of script.behaviors) {
            var behavior = new Behavior(behaviorScript);
            this.behaviors.push(behavior);
        }

        for (var itemScript of script.items) {
            var item = new Item(itemScript);
            this.items.push(item);
        }

        for (var itemScript of script.inventory) {
            var item = new Item(itemScript);
            this.inventory.add(item);
        }

        this.gameObjects.sort((a, b) => a.drawOrder - b.drawOrder);

        this.currentRoom = this.rooms[0];
    }
}