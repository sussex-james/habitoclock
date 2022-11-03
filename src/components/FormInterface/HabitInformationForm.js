import React, {useContext, useState, useEffect} from "react";
import { Input, Button, Badge } from '@chakra-ui/react'
import {observer} from "mobx-react";
import HabitStore from "./HabitStore";

export default observer(({onDone}) => {

    const habitInformation = useContext(HabitStore);

    const [currentTime, setCurrentTime] = useState({hour: null, minute: null})

    useEffect(() => {
        console.log('The current time has changed.', currentTime)
        console.log(currentTime.hour)
    }, [currentTime])

    // user adds info. whenever they update it, HabitInformation.ts (business logic) calculates the presumed carbon cost.
    // it gets the average energy usage from GPT-3 (rough guess, it's close enough) and calculates the typical one time usage
    // that way we can calculate the negative or positive impact of habits. Running for example has no impact.
    // so user learns as they use the application too.

    return(<div style={{fontSize:"150%"}}>
        What habit will you do more of?
        <Input placeholder="What's the habit you want to switch to (do more of)" onChange={(e) => habitInformation.setHabit(e.target.value)}
        /><br />
        <small style={{color:"grey"}}>e.g. 🥛 "drink milk", 🏋️ "go to gym", 🎨 "learn to paint" <span style={{opacity:0}}>{habitInformation.habit}</span></small>
        <br /><br />

       <div style={{opacity: habitInformation.habit === '' ? 0.1 : 1}}>What will you stop doing e.g. drinking coffee, watching TV, gaming {habitInformation.insteadHabitCost != -1 && <span>This habit uses {habitInformation.insteadHabitCost} Carbon g/kwh</span>}
            <Input placeholder="Habit you'll stop" onChange={(e) => habitInformation.setInsteadHabit(e.target.value)} /><br />
            <small style={{color:"grey"}}>e.g. ☕ "drink coffee", 📺 "watch TV", 🎮 "gaming"</small>

        </div>

        {habitInformation.insteadHabit !== '' && <div><br /><br />
        When do you currently do the habit each day you are changing?<br />

            <div style={{padding:"10px", border: "1px solid lightgrey"}}>
        <input type="time" id="habit2" name="habit2" required onChange={(e) => {
            var date = e.target.value.split(':');

            var hours = date[0];
            var minutes = date[1];
            setCurrentTime({hour: hours, minute: minutes})
        }} />
                <Button onClick={() => {
                    habitInformation.addTime({ hour: currentTime.hour, minute: currentTime.minute})
                }}>Add this time</Button>
            </div>
            <small style={{color:"lightgrey"}}>
        e.g. If you drink coffee at 9, 12 and 3pm, add 09:00 first and then you can add more.
            </small>

            <div style={{padding: "10px", backgroundColor:"rgb(240,240,240)", borderRadius:"15px", margin:"10px"}}>
                <h2>Times</h2>
                {habitInformation.whenUserDoes.map((timeRepresentation) => <Badge>{timeRepresentation.hour}:{timeRepresentation.minute}&nbsp;</Badge>)}
            </div>

            <div style={{float:"right"}}>
                {habitInformation.whenUserDoes.length > 1 ?
                <Button colorScheme="green" onClick={() => onDone()}>Suggest optimal changes!</Button>
                    : <Badge>(add at least two times to calculate optimal changes)</Badge>}
            </div>
        </div>}

        <div style={{opacity:0.03, marginTop:"20px"}}>
            {habitInformation.habit}
            {habitInformation.insteadHabit}
        </div>
    </div>)
})
