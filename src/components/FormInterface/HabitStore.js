import {observable} from "mobx";
import {createContext} from "react";
import ResettableStore from "./ResettableStore";

class Habit extends ResettableStore {
    // if called before user logged in, won't find the user...

    constructor() {
        super();
    }

    @observable habit = '';
    @observable insteadHabit = '';

    @observable habitCost = -1;
    @observable insteadHabitCost = -1;

    @observable whenUserDoesIt = observable.array([]);

    @action addTime(timeRepresentation) {
        this.whenUserDoesIt.push(timeRepresentation)
    }

    @action setHabit(to) {
        this.habit = to;
    }

    @action setInsteadHabit(to) {
        this.insteadHabit = to
    }

    @action setHabitCost(to) {
        this.habitCost = to;
    }

    @action setInsteadHabitCost(to) {
        this.insteadHabitCost = to
    }
}


export const userDataStaticInstance = new Habit();

export default createContext(userDataStaticInstance)
