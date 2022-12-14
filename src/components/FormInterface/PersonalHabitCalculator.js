import React, {useContext, useState, useEffect} from "react";
import HabitInformationForm from "./HabitInformationForm";
import FetchResults from "./../FetchResults";
import Results from "./../Results";
import HabitStore from "./HabitStore";

import {observer} from "mobx-react";

export default observer(() => {

    const habitInformation = useContext(HabitStore);
  // Manages the UI, whether to show form, loading, or results.

  // Based on state changes (form done etc), calls the Carbon APi to get data.

  // Output the data. For example Evening coffee or at the gym you are saving energy vs TV!

  const STAGES = {
    FIRST_GATHER_HABIT_DATA: "GATHER",
    SECOND_PROCESS_DATA: "PROCESS",
    THIRD_SHOW_RESULTS: "RESULTS",
  };

  const [stage, setStage] = useState(STAGES.FIRST_GATHER_HABIT_DATA);

  /*useEffect(() => {
        if (form.done) {
            setStage(STAGES.SECOND_PROCESS_DATA)
        }
    }, [form])*/

  return (
    <div style={{ padding: "12% 20%" }}>
      {stage === STAGES.FIRST_GATHER_HABIT_DATA && (
        <HabitInformationForm
          onDone={() => setStage(STAGES.SECOND_PROCESS_DATA)}
        />
      )}
      {stage === STAGES.SECOND_PROCESS_DATA && (
        <FetchResults onDone={() => setStage(STAGES.THIRD_SHOW_RESULTS)} />
      )}
      {stage === STAGES.THIRD_SHOW_RESULTS && (
        <div>
          <Results results={habitInformation.results}/>
        </div>
      )}
    </div>
  );
});
