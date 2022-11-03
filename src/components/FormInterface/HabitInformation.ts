
export interface TimeRepresentation {
    minute: Number,
    hour: Number
}

// Used this for a while but it was duplicating state a lot, so switched to Mobx Store with Context API

// @deprecated
// @deletable
// @replacedBy './HabitStore.js'
export class HabitInformation {

    habit: string = 'sd';
    insteadHabit: string = '';

    habitCost: Number = undefined; // kw usage per "usage" for 10 minutes e.g. "drinking water" "cycling"
    insteadHabitCost: Number = undefined; // kw usage of what they are replacing e.g. "drinking coffee", "bus"

    whenUserDoes: Array<TimeRepresentation>;

    // when user does it. list oftime stmaps.

    constructor() {

    }

    setHabit = (to) => {
        this.habit = to;
        console.log('Updated habit, set it to: ', to)
        console.log(this.habit)
    };

    setInsteadHabit = (to) => this.insteadHabit = to;

    addTimeUserDoesIt = (timeRepresentation) => this.whenUserDoes.push(timeRepresentation)
}
