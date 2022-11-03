import React, {useContext, useState, useEffect} from "react";
import { Input, Button, Badge, Spinner } from '@chakra-ui/react'
import {observer} from "mobx-react";
import HabitStore from "./FormInterface/HabitStore";
import {CarbonUsageService} from "../services/CarbonUsage";

/**
 * This component is for the business logic of calling the Green Carbon API and working out whether changing habit is good or bad.
 * It suggets optimal time to change based on that.
 *
 * Example: Switching from coffee to milk. Which of the 3 coffees (9, 12, 3) to switch?
 *
 * 3pm has most impact. Switching will consume less carbon, because milk(new habit) uses less KW/h than coffee (old habit)
 *
 * So suggest switching at most impact point (3pm)
 *
 *
 *
 * In the opposite case where the habit makes things worse, suggest changing as least impact point.
 *
 * Exmaple: Switching from Oversleeping to Language Learning app
 *
 * Can do cahnge at 11pm (night) or 7:30am (morning). Impact is more in the morning let's say.
 * So it would suggest changing at night.
 *
 *
 * Hhhm this is overcomplicated. Maybe just one habit? Because calculating two is tricky.
 */
export default observer(({onDone}) => {

    const habitInformation = useContext(HabitStore);


    useEffect(() => {
        // with habit store info, call the carbon api.
        let costAtTimes = []
        const kwAmount = 1 // for this habit.
        habitInformation.whenUserDoes.map((time) => {
            CarbonUsageService.getUsageOfKW(time, kwAmount).then((usage) => {
                console.log('Usage would be: ', usage)
            })
        })
    }, [])

    return(<div style={{fontSize:"150%"}}>
        <Spinner color='green.500' /> Gathering habit-change recommendations...
    </div>)
})
