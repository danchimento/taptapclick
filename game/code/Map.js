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
        this.items = [];
        this.currentRoom = null;
        this._script = script;
        this.message = "Escape the room!";
    }

    init () {
        this.rooms = [];
        this.behaviors = [];
        this.gameObjects = [];
        this.items = [];
        this.inventory = null;
        this.message = "";

        this._parseScript(this._script.map);
    }

    trigger(type, target) {

        var actionPerformed = false;

        if (type == "tap" && this.inventory.selectedItem) {
            type = "use_item"
        }

        behaviorsToExecute = [];

        // Look for matching behaviors to execute
        for (var behavior of this.behaviors) {
            if (behavior.target == target && behavior.trigger == type) {
                if (this.testConditions(behavior.conditions)) {
                    behaviorsToExecute.push(behavior);
                }
            }
        }

        // Execute all matching behaviors
        for (var behavior of behaviorsToExecute) {
            this._performActions(behavior.actions);
            actionPerformed = true;
        }


        if (actionPerformed) {
            return;
        }

        var object = this._getGameObject(target);

        // Attempt to add the item to the object
        if (this.inventory.selectedItem 
            && object.inventory 
            && this.testConditions(object.inventory.conditions)) {
                object.inventory.add(this.inventory.selectedItem);
                this.inventory.remove(this.inventory.selectedItem);
        }

        // On a single taps items should be either placed ot picked up
        else {
            // Check to see if the object has items
            if (object.inventory 
                && object.inventory.items.length 
                && this.testConditions(object.inventory.conditions)) {

                // Add all the items to the users inventory
                for (var item of object.inventory.items) {
                    object.inventory.remove(item);
                    this.inventory.add(item);
                }
            }
        }

        this.inventory.clearSelectedItem();
    }

    pickUpItem(itemId) {
        
        // Items can't be picked up if an item is selected in the inventory
        if (this.inventory.selectedItem && this.inventory.selectedItem.name != itemId) {
            return;
        }

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

            if (!gameObject.visible()) {
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

        // Move item actions
        if (action.moveItem) {
            if (action.target == "inventory") {
                var item = this.items.find(i => i.name == action.moveItem);
                this.inventory.add(item);
            }
        }

        // Consume Item
        if (action.consumeItem) {
            var item = this.items.find(i => i.name == action.consumeItem);

            if (item) {
                this.inventory.remove(item)
            }
        }

        // End game actions
        if (action.endLevel) {
            this.message = "YOU WIN!"
        }
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

        // Test Use Item
        if (condition.item) {
            if (!this._wildcardCompare(condition.item, this.inventory.selectedItem.name)) {
                return false;
            }
        }

        // Test has Item
        if (condition.hasItem) {
            var target = this._getGameObject(condition.target);
            if (!target.inventory.hasItem(condition.hasItem)) {
                return false;
            }
        }

        return true;
    }

    _wildcardCompare(item1, item2) {
        var indexOfItem1Wildcard = item1.indexOf('*');

        if (indexOfItem1Wildcard == 0) {
            return item2.endsWith(item1.replace('*', ''));
        }

        if (indexOfItem1Wildcard == item1.length - 1) {
            return item2.startsWith(item1.replace('*', ''));
        }

        var indexOfItem2Wildcard = item2.indexOf('*');

        if (indexOfItem2Wildcard == 0) {
            return item1.endsWith(item2.replace('*', ''));
        }

        if (indexOfItem2Wildcard == item1.length - 1) {
            return item1.startsWith(item2.replace('*', ''));
        }

        return item1 == item2;
    }

    _getGameObject(name) {
        var matchingObject = this.gameObjects.find(go => go.name == name);
        
        if (matchingObject) {
            return matchingObject;
        }
        
        // var matchingItem = this.items.find(item => item.name == name);

        // if (matchingItem) {
        //     return matchingItem;
        // }
    }

    dropItem(item, target) {
        this.inventory.remove(item);
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

        this.inventory = new Inventory(script.inventory);

        this.gameObjects.sort((a, b) => a.drawOrder - b.drawOrder);

        this.currentRoom = this.rooms[0];
    }
}