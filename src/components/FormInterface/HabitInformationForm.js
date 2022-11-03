import React, {useContext, useState} from "react";
import { Input } from '@chakra-ui/react'
import {observer} from "mobx-react";
import HabitStore from "./HabitStore";

export default observer(({setFormOnDone}) => {

    const habitInformation = useContext(HabitStore);


    // user adds info. whenever they update it, HabitInformation.ts (business logic) calculates the presumed carbon cost.
    // it gets the average energy usage from GPT-3 (rough guess, it's close enough) and calculates the typical one time usage
    // that way we can calculate the negative or positive impact of habits. Running for example has no impact.
    // so user learns as they use the application too.

    return(<div>
        Tell me about this Habit change.
        <Input placeholder="What's the habit you want to switch to (do more of)" onChange={(e) => habitInformation.setHabit(e.target.value)} /><br />
        <small style={{color:"lightgrey"}}>e.g. "drink water", "go to gym", learn to paint</small>
        <br /><br />
        Habit:{habitInformation.habit}:

        {habitInformation.habit !== '' && <div>What will you stop doing e.g. drinking coffee, watching TV, gaming {habitInformation.insteadHabitCost && <span>This habit costs {habitInformation.insteadHabitCost}</span>}

            <Input placeholder="Habit you'll stop" onChange={(e) => habitInformation.setInsteadHabit(e.target.value)} /><br />


        </div>}

        {habitInformation.insteadHabit !== '' && <div>
        When do you currently do the habit each day you are changing?

        <input type="time" id="habit2" name="habit2" required />
            <small style={{color:"lightgrey"}}>
        e.g. If you drink coffee at 9, 12 and 3pm, add 09:00 first and then you can add more.
            </small>

            <div style={{paddingTop:"10px", paddingBottom:"10px"}}>
                <h3>Times</h3>
                {habitInformation.whenUserDoes.map((timeRepresentation) => <div>{timeRepresentation.hour}:{timeRepresentation.minute}</div>)}
            </div>


        <button>Suggest optimal changes!</button>
        </div>}

    </div>)
})
