export default class Room
{
    constructor(script) {
        this.name = script.name;
        this.layout = [];

        this._parseScript(script);
    }

    _parseScript(script) {
        this.layout = script.layout;
    }
}