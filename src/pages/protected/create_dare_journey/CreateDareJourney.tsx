import React, { useState } from "react";
import StageOne from "./stages/StageOne";
import StageThree from "./stages/StageThree";
import StageTwo from "./stages/StageTwo";
import StageFour from "./stages/StageFour";
import CreateDareJourneyStyles from "./CreateDareJourney.module.css";
import { journeyController } from "../../../bass/controllers/Journeys.controller";
import { Journey } from "../../../types/UserType";
import { Timestamp } from "firebase/firestore";
import { useFirebaseAuth } from "../../../bass/auth/auth";
import StageCircle from "../../../components/stage_circle/StageCircle";
// import {Dare, JourneyDare } from "../../../types/FreakPoolType";

const CreateDareJourney: React.FC = () => {
  
  const {createJourney} = journeyController()
  const [stage, setStage] = useState<number>(1);
  const [formData, setFormData] = useState<any>({});
  const {user} = useFirebaseAuth()

  const handleSubmit = async (data: any) => {
    setFormData((prevData:any) => ({ ...prevData, [stage]: data }));

    if (stage < 3) {
      setStage((prevStage) => prevStage + 1);
    } else {
      console.log("Posting data to db:", formData);
     
      const journey:Journey= {
        name: formData[1].name,
        journey_dares: formData[3] ,
        end_date: formData[2].endDate,
        milestone: "ongoing",
        start_date: formData[2].startDate,
        swaps_made: 0,
        created_by: user!.uid,
        created_at: Timestamp.now(),
        id: ""
      }
      const res = await createJourney(journey)
      console.log("response" ,res);
    }
  };

  const handleGoBack = (): void => {
    setStage((prevStage) => prevStage - 1);
  };

  const renderStage = () => {
    switch (stage) {
      case 1:
        return (
          <StageOne
            handleSubmit={handleSubmit}
            handleGoBack={handleGoBack}
          />
        );
      case 2:
        return (
          <StageTwo
            handleSubmit={handleSubmit}
            handleGoBack={handleGoBack}
          />
        );
      case 3:
        return (
          <StageThree
            handleSubmit={handleSubmit}
            handleGoBack={handleGoBack}
          />
        );
      case 4:
        return <StageFour handleGoBack={handleGoBack} />;
      default:
        return (
          <StageOne
            handleSubmit={handleSubmit}
            handleGoBack={handleGoBack}
          />
        );
    }
  };

  return (
    <main className={CreateDareJourneyStyles.journeys}>
      <StageCircle stage={stage} />
      <section>{renderStage()}</section>
    </main>
  );
};

export default CreateDareJourney;
