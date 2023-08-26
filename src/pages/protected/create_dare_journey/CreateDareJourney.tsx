import React, { useState } from "react";

import StageCircle from "@components/stage_circle/StageCircle";
import StageOne from "./stages/StageOne";
import StageThree from "./stages/StageThree";
import StageTwo from "./stages/StageTwo";
import StageFour from "./stages/StageFour";


import CreateDareJourneyStyles from "./CreateDareJourney.module.css";
import AW_API from "@appwrite/api";
import useAuth from "@hooks/useAuth";

const CreateDareJourney: React.FC = () => {
  const [stage, setStage] = useState<number>(1);
  const [formData, setFormData] = useState<any>({});
  const {auth} = useAuth()

  const handleSubmit = async (data: any) => {
    setFormData((prevData:any) => ({ ...prevData, [stage]: data }));

    if (stage < 3) {
      setStage((prevStage) => prevStage + 1);
    } else {
      console.log("Posting data to db:", formData);
      const journey = {
          name:formData[1].name,
          dares:  ['Make money for fun', 'Drive to the Make it', 'Dive into it'],  //replace with the selected dares from the darepool
          endDate : formData[2].endDate,
          milestone :  "ongoing",           //default value -- supposed to have been configured in db set up
          startDate : formData[2].startDate,
          swapsMade : 0,
          userId : auth.user.id   //reference to the current authenticated user
      }
      const res = await AW_API.createJourney(journey)
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
