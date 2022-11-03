
/*
This does the heavy lifting of logic like combining user goals with the API responses,
coordinating generating imagery with the clock times that the CarbonHack responds.

 */

import * as React from "react";
import Chat from "./Chat";
import {useState} from "react";
import {
    Button,
} from "@chakra-ui/react";
import {useEffect} from "react";

export default ({}) => {

    const STATES = {
        INITIAL_GET_CONSENT: 'INITIAL_GET_CONSENT',
        GATHER_HABIT_SELF_REPORT_INFO: 'GATHER_HABIT_SELF_REPORT_INFO',
        DETERMINE_IF_HABIT_OCCURING_USES_CARBON: 'DETERMINE_IF_HABIT_OCCURING_USES_CARBON',
        GATHER_WHEN_USER_DOES_IT: 'GATHER_WHEN_USER_DOES_IT',
        CALCULATE_CARBON_USAGE_TELL_USER: 'CALCULATE_CARBON_USAGE_TELL_USER', // each day etc.
        SUGGEST_OPTIMAL_TIME_TO_CHANGE: 'SUGGEST_OPTIMAL_TIME_TO_CHANGE'
    };

    const [stage, setStage] = useState(STATES.INITIAL_GET_CONSENT)

    const [habitAction, setHabitAction] = useState('')
    const [insteadHabitAction, setInsteadHabitAction] = useState('')
    // imagine user wants to cycle instead of driving. It saves every but not from carbon live.

    const [onNextMessage, setOnNextMessage] = useState(false)

    useEffect(() => {
        if (stage === STATES.GATHER_HABIT_SELF_REPORT_INFO) {
            setMessages((prev) => [...prev,
                { from: "me", text:"Yes, go ahead!"},
                { from: "computer", text: "Please describe the habit as a simple action."},
                { from: "computer", text: "For example: 'drink coffee', 'go to gym', or 'drive'"},
            ])
        setOnNextMessage((usersMessage) => {
            setHabitAction(usersMessage)
            setMessages((prev) => [...prev,
                { from: "me", text: [usersMessage]},
                { from: "computer", text: "Great! Would you swap " + usersMessage + " for something else or just do nothing instead?"},
                { from: "computer", text: "For example: 'Do nothing', or 'drink water', or 'use bus instead'"},
            ])
            setOnNextMessage((insteadHabit) => {
                setInsteadHabitAction(insteadHabit)
                setMessages((prev) => [...prev,
                    { from: "me", text: [usersMessage]},
                    { from: "computer", text: "Ok thanks! Give me a minute while I gather some info..."},
                ])
                setStage(STATES.DETERMINE_IF_HABIT_OCCURING_USES_CARBON)
            })
        })
        }
    }, [stage]);

    const [messages, setMessages] = useState([
        { from: "computer", text: "Hi, My Name is Habitoclock" },
        { from: "computer", text: "Did you know having an extra ☕ at 3pm uses much dirtier energy than 10am?" },
        { from: "computer", text: "Can I learn about your habits to suggest the best times to change them?" },

    ]);

    const forcedActionButtons = useState(<div style={{marginLeft:"auto"}}><Button onClick={() => setStage(STATES.GATHER_HABIT_SELF_REPORT_INFO)}>Yes, go ahead!</Button></div>)



    // self report activities.

    // Determine if this habit increases or decreases energy usage.

    // E.g. drinking coffee = uses kettle = increases uage
    // Going to green gym = reduces usage
    // Reading a book rather than watching Tv = reduces usage ("good for environent")

    // convert to moment times, use current date and 24 hour system.

    // use carbon hack discrete times to get energy usage at times

    // calculate which of the times have worse impact. Formulate with generative API the response.

    return(<div>
        <Chat forcedActionButtons={forcedActionButtons} messages={messages} setMessages={setMessages}
        onNextMessage={(msg) => onNextMessage(msg)}/>
    </div>)
}
