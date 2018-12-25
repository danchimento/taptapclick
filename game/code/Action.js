export default class Action {
    constructor(script) {
        this.target = script.target;
        this.state = script.state;
        this.message = script.message;
        this.endLevel = script.endLevel;
        this.moveItem = script.moveItem;
        this.consumeItem = script.consumeItem;
    }
}