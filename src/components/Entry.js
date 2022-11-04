import React, {useState} from "react";
import Hero from "./Hero";
import {WattUsageAndEmojisService} from "../services/WattUsageAndEmojis";

import {
    Flex, Button
} from "@chakra-ui/react";
import PersonalHabitCalculator from "./FormInterface/PersonalHabitCalculator";



export default () => {


    const [seenEntry, setSeenEntry] = useState(false);
    const [sampleOutput, setSampleOutput] = useState([])

    return (<div>
        <Button onClick={async () => setSampleOutput(await WattUsageAndEmojisService.getWattUsageAndEmojis(["cycling", "cooking roast dinner"])) }>Test Watt Usage</Button>
        {sampleOutput.length > 0 && <div><h1>Samples</h1>
        <p>
            {sampleOutput.map((sample) => <div>{sample.topic + ' has emoji: ' + sample.emoji + ' and watt usage for 10 mins: ' +  sample.watts}</div>)}
        </p>
        </div>}

        {seenEntry === false && <WelcomeScreen onDone={() => setSeenEntry(true)}/>}
        {seenEntry && <div><PersonalHabitCalculator/></div>}
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
            title="Get insights on your routines Carbon Impact"
            subtitle="Reduce your Carbon Footprint by purposefully choosing which times to change your routine for the most green impact"
            image="https://source.unsplash.com/collection/404339/800x600"
            ctaText="Help me reduce my footprint"
            ctaOnClick={() => onDone()}
        />
    </Flex>
</div>;
