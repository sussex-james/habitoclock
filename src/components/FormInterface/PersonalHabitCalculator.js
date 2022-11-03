import React, {useEffect, useState} from "react";
import HabitInformationForm from "./HabitInformationForm";


export default () => {

    // Manages the UI, whether to show form, loading, or results.

    // Based on state changes (form done etc), calls the Carbon APi to get data.

    // Output the data. For example Evening coffee or at the gym you are saving energy vs TV!

    const STAGES = {
        FIRST_GATHER_HABIT_DATA: 'GATHER',
        SECOND_PROCESS_DATA: 'PROCESS',
        THIRD_SHOW_RESULTS: 'RESULTS'
    }

    const [stage, setStage] = useState(STAGES.FIRST_GATHER_HABIT_DATA);

    /*useEffect(() => {
        if (form.done) {
            setStage(STAGES.SECOND_PROCESS_DATA)
        }
    }, [form])*/

    return(<div style={{padding:"15%"}}>
        Stage: {stage}
        {stage === STAGES.FIRST_GATHER_HABIT_DATA && <HabitInformationForm  />}
        {stage === STAGES.SECOND_PROCESS_DATA && <div>Fetching results</div>}
        {stage === STAGES.THIRD_SHOW_RESULTS && <div>Results:</div>}
    </div>)
}
