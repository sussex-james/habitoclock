import React, {useState} from "react";
import Hero from "./Hero";

import {
    Flex,
} from "@chakra-ui/react";
import PersonalHabitCalculator from "./FormInterface/PersonalHabitCalculator";


export default () => {


    const [seenEntry, setSeenEntry] = useState(true);

    return (<div>
        {seenEntry === false && <WelcomeScreen onDone={() => setSeenEntry(true)}/>}
        {seenEntry && <div><h1>Calculator</h1><PersonalHabitCalculator/></div>}
    </div>)

}
const WelcomeScreen = ({onDone}) => <div>
    <Flex
        direction="column"
        align="center"
        maxW={{xl: "1200px"}}
        m="0 auto"
    >
        <Hero
            title="Motivate yourself to achieve better habits by helping the environment"
            subtitle="Reduce your Carbon Footprint by purposefully choosing which times to change your habits for the most green impact"
            image="https://source.unsplash.com/collection/404339/800x600"
            ctaText="Help me reduce my footprint"
            ctaOnClick={() => onDone()}
        />
    </Flex>
</div>;
