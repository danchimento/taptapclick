import ImageLibrary from './ImageLibrary'
import Condition from './Condition';

export default class Appearance {
    constructor(script) {
        this.imageName = script.image;
        this.stateCondition = script.state;
    }
}