import {observable, action, makeAutoObservable} from "mobx";
import {createContext} from "react";

export default createContext(new class Habit {
    // if called before user logged in, won't find the user...

    constructor() {
        makeAutoObservable(this);
    }

    habit = ''
    insteadHabit = ''
    habitCost = -1;
    insteadHabitCost = -1;
    whenUserDoes = [];

    addTime = (timeRepresentation) => {
        this.whenUserDoes.push(timeRepresentation)
    }

    setHabit = (to) => {
        console.log('In store updating habit to: ', to)
        this.habit = to;
    }

    setInsteadHabit = (to) => {
        this.insteadHabit = to
    }

    setHabitCost = (to) => {
        this.habitCost = to;
    }

    setInsteadHabitCost = (to) => {
        this.insteadHabitCost = to
    }
})
