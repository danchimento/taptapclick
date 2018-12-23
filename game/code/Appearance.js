import ImageLibrary from './ImageLibrary'
import Condition from './Condition';

export default class Appearance {
    constructor(script) {
        this._imageName = "";
        this._conditions = [];

        this._parseScript(script);
    }

    _parseScript(script) {
        this._imageName = script.image;

        if (script.conditions) {
            for (var scriptCondition of script.conditions) {
                var condition = new Condition(scriptCondition);
                this._conditions.push(condition);
            }
        }
    }
}