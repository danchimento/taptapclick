import Condition from "./Condition";
import Action from "./Action";

export default class Behavior
{
    constructor(script) {
        this.target = script.target;
        this.trigger = script.trigger;
        this.conditions = [];
        this.actions = [];

        if (script.conditions) {
            for (var scriptCondition of script.conditions) {
                var condition = new Condition(scriptCondition);
                this.conditions.push(condition);
            }
        }

        for (var scriptAction of script.actions) {
            var action = new Action(scriptAction);
            this.actions.push(action);
        }
    }
}