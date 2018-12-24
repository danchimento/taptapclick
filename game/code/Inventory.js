export default class Inventory {
    constructor() {
        this.items = [];
    }

    add(item) {
        this.items.push(item);
        item.position = null;
    }
}