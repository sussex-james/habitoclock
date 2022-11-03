import React, {useState} from "react";
import PersonalHabitCalculator from "./PersonalHabitCalculator";
import Hero from "./Hero";

import {
    Flex,
} from "@chakra-ui/react";


export default () => {


    const [seenEntry, setSeenEntry] = useState(false);

    return (<div>
        {seenEntry === false && <WelcomeScreen onDone={() => setSeenEntry(true)}/>}
        {seenEntry && <PersonalHabitCalculator/>}
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
            title="Motivate yourself to achieve better habits,"
            subtitle="Time your habits purposefully, and you'll help yourself while reducing your Carbon Footprint!"
            image="https://source.unsplash.com/collection/404339/800x600"
            ctaText="Help me reduce my footprint"
            ctaOnClick={() => onDone()}
        />
    </Flex>
</div>;
