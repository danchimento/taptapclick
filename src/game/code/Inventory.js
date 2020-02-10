import Condition from "./Condition";
import Item from './Item';
import { wildcardCompare } from './Utilities'

export default class Inventory {

    constructor(script) {
        this.items = [];
        this.size = 5;
        this.selectedItem = null;
        this.enabled = script ? true : false;
        this.conditions = [];

        if (script.items) {
            for (var itemScript of script.items) {
                var item = new Item(itemScript);
    
                this.items.push(item);
            }
        }

        if (script.conditions) {
            for (var conditionScript of script.conditions) {
                var condition = new Condition(conditionScript);
                this.conditions.push(condition);
            }
        }
    }

    init() {
        this.items = [];
        this.selectedItem = null;
    }

    add(item) {
        this.items.push(item);
        item.position = null;
    }

    remove(item) {
        this.items = this.items.filter(i => i.name != item.name);
    }

    removeItems(name) {
        var items = this.items.filter(i => {
            return wildcardCompare(name, i.name)
        });

        for (var item of items) {
            this.remove(item);
        }
    }

    hasItem(itemName) {

        var foundItem = this.items.find(i => {
            if (itemName.indexOf('*')) {
                return i.name.startsWith(itemName.replace('*', ''));
            } else {
                return i.name == itemName;
            }
        });

        if (foundItem) {
            return true;
        }

        return false;
    }

    selectItem(item) {
        if (this.selectedItem && this.selectedItem.name == item.name) {
            this.selectedItem = null;
            return;
        }

        this.selectedItem = item;
    }

    clearSelectedItem() {
        this.selectedItem = null;
    }
}