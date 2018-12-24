export default class Action {
    constructor(script) {
        this.target = script.target;
        this.state = script.state;
        this.message = script.message;
    }
}