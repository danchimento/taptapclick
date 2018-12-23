export default class Condition {
    constructor(script) {
        this.state = ""

        this._parseScript(script);
    }

    _parseScript(script) {
        this.state = script.state;
    }
}