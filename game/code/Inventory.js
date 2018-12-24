export default class Inventory {

    constructor() {
        this.items = [];
        this.size = 5;
    }

    add(item) {
        this.items.push(item);
        item.position = null;
    }
}