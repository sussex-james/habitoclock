import React, {useContext, useState, useEffect} from "react";
import { Input, Button, Badge, Spinner } from '@chakra-ui/react'
import {observer} from "mobx-react";
import HabitStore from "./FormInterface/HabitStore";

/**
 * This component just initiates the API calls and has a simple loading screen
 */
export default observer(({onDone}) => {

    const habitInformation = useContext(HabitStore);


    useEffect(() => {
        habitInformation.processIntoResults(() => onDone())
    }, [])

    return(<div style={{fontSize:"150%"}}>
        <Spinner color='green.500' /> Gathering habit-change recommendations...
    </div>)
})
