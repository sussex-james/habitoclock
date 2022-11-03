import React, {useContext, useState, useEffect} from "react";
import { Input, Button, Badge } from '@chakra-ui/react'
import {observer} from "mobx-react";
import HabitStore from "./HabitStore";

export default observer(({onDone}) => {

    const habitInformation = useContext(HabitStore);

    const [currentTime, setCurrentTime] = useState({hour: null, minute: null})

    const [currentActivity, setCurrentActivity] = useState('')
    // We could tie times to specific habits and have multiple habits.
    // This did use typescript TimeRepresentation before but TS is difficult to configure without ejecting react which
    // isn't worthwhile for the purpose of the hakacthon.

    useEffect(() => {
        console.log('The current time has changed.', currentTime)
        console.log(currentTime.hour)
    }, [currentTime])

    // user adds info. whenever they update it, HabitInformation.ts (business logic) calculates the presumed carbon cost.
    // it gets the average energy usage from GPT-3 (rough guess, it's close enough) and calculates the typical one time usage
    // that way we can calculate the negative or positive impact of habits. Running for example has no impact.
    // so user learns as they use the application too.

    return(<div style={{fontSize:"150%"}}><h1>Add your Routine</h1>

        <h1>What is the activity?</h1>
        <Input placeholder="" onChange={(e) => setCurrentActivity(e.target.value)}/>
        <br />
        <small style={{color:"grey"}}>e.g. 🥛 "drink milk", 🏋️ "go to gym", 🎨 "learn to paint"</small>
       <div>
           <br />
        When do you do it?<br />

            <div style={{padding:"10px", border: "1px solid lightgrey"}}>
                <input type="time" id="habit2" name="habit2" required onChange={(e) => {
                    var date = e.target.value.split(':');

                    var hours = date[0];
                    var minutes = date[1];
                    setCurrentTime({hour: hours, minute: minutes})
                }} />
            </div>
            <small style={{color:"lightgrey", marginBottom:"10px"}}>
                e.g. If you drink coffee at 9, 12 and 3pm, add 09:00 first and then you can add more.
            </small>
           <br />
           <Button onClick={() => {
               habitInformation.addRoutineItem({ description: currentActivity,
                   timeRepresentation: { hour: currentTime.hour, minute: currentTime.minute}})
           }}>
               Add this routine item
           </Button>

            <div style={{padding: "10px", backgroundColor:"rgb(240,240,240)", borderRadius:"15px", margin:"10px", marginTop:"50px"}}>
                <h2>Routine</h2>
                {habitInformation.routineItems.slice().sort((a, b) => a.timeRepresentation.hour < b.timeRepresentation.hour)
                    .map((routineItem) =>
                    <div><Badge>{routineItem.timeRepresentation.hour}:{routineItem.timeRepresentation.minute}&nbsp; {routineItem.description}</Badge></div>)}
            </div>

            <div style={{float:"right"}}>
                {habitInformation.routineItems.length > 1 ?
                <Button colorScheme="green" onClick={() => onDone()}>Suggest optimal changes!</Button>
                    : <Badge>(add at least two times to calculate optimal changes)</Badge>}
            </div>
        </div>
    </div>)
})
