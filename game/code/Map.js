import Room from './Room';
import GameObject from './GameObject'
import Behavior from './Behavior';
import Item from './Item';
import Inventory from './Inventory';
import { wildcardCompare } from './Utilities';
import { PlaySound, StopSound, PlaySoundRepeat, PlaySoundMusicVolume } from 'react-native-play-sound';

export default class Map 
{
    constructor(script) {
        this.name = script.map.name
        this.rooms = [];
        this.behaviors = [];
        this.gameObjects = [];
        this.items = [];
        this.currentRoom = null;
        this._script = script;
    }

    init () {
        this.rooms = [];
        this.behaviors = [];
        this.gameObjects = [];
        this.items = [];
        this.inventory = null;
        this.message = "";
        this.levelComplete = false;

      //  throw("Test Error on Map init")

        this._parseScript(this._script.map);
    }

    trigger(type, target) {

        if (this.levelComplete) {
            return;
        }

        this.message = "";

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

        if (this.levelComplete) {
            return;
        }
        
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

        if (action.sound) {
            PlaySound(action.sound);
        }

        // Consume Item
        if (action.consumeItem) {
            if (!action.target) {
                var item = this.inventory.selectedItem;

                if (item) {
                    this.inventory.remove(item);
                    this.inventory.clearSelectedItem();
                }
            }
            if (action.target == "inventory") {
                this.inventory.removeItems(action.consumeItem);
            }
            else {
                var gameObject = this._getGameObject(action.target);
                
                if (gameObject) {
                    gameObject.inventory.removeItems(action.consumeItem);
                }
            }
        }

        // End game actions
        if (action.endLevel) {
            this.levelComplete = true;
            this.onWin();
        }
    }

    selectItem(itemName) {
        this.inventory.selectItem(itemName);
        
        if (this.inventory.selectedItem && this.inventory.selectedItem.description) {
            this.message = this.inventory.selectedItem.description
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
            if (!wildcardCompare(condition.item, this.inventory.selectedItem.name)) {
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

    _getGameObject(name) {
        var matchingObject = this.gameObjects.find(go => go.name == name);
        
        if (matchingObject) {
            return matchingObject;
        }
    }

    _parseScript(script) {

        this.message = script.message;

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