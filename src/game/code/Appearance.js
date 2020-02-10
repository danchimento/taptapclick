import ImageLibrary from './ImageLibrary'
import Condition from './Condition';

export default class Appearance {
    constructor(script) {
        this.imageName = script.image;
        this.conditions = [] 
        
        if (script.conditions) {
            for (var scriptCondition of script.conditions) {
                var condition = new Condition(scriptCondition);
                this.conditions.push(condition);
            }
        }
    }
}