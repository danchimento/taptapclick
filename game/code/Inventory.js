export default class Inventory {

    constructor() {
        this.items = [];
        this.size = 5;
        this.selectedItem = null;
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
        this.items.remove(item);
    }

    selectItem(item) {
        if (this.selectedItem && this.selectedItem == item.name) {
            this.selectedItem = null;
            return;
        }

        this.selectedItem = item.name;
    }

    clearSelectedItem(item) {
        this.selectedItem = null;
    }
}