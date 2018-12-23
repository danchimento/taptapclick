export default class Room
{
    constructor(script) {
        this.name = script.name;
        this.layout = [];
    }

    init() {
        
    }

    _parseScript(script) {
        this.layout = script.layout;
    }
}