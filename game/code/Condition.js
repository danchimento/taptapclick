export default class Condition {
    constructor(script) {
        this.state = script.state;
        this.target = script.target;
        this.receivedItem = script.receivedItem;
        this.item = script.item;
    }
}