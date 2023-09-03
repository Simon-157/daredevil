import { lazy, useEffect, useState } from "react";
import CustomLoader from "../../../components/loader/loader";
import {useJourneyStatus} from "../../../hooks/useJourneyStatus";
const OnGoingJourney = lazy(() => import("./ongoing_journey/OnGoingJourney"));
const NoOngoingJourney = lazy(() => import("./no_ongoing_journey/NoOngoingJourney"));


const HomeWrapper = () => {
  const hasOngoing = useJourneyStatus();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hasOngoing !== undefined) {
      setIsLoading(false);
    }
  }, [hasOngoing]);

  return (
    <>
      {isLoading? (
        <CustomLoader size="60" />
      ) : hasOngoing ? (
        <OnGoingJourney />
      ) : (
        <NoOngoingJourney />
      )}
    </>
  );
};

export default HomeWrapper;
