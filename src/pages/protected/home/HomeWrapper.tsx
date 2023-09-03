import { lazy } from "react";
import CustomLoader from "../../../components/loader/loader";
import {useJourneyStatus} from "../../../hooks/useJourneyStatus";
import { useQuery } from "react-query";
import { fetchData } from "../../../utils/functions";
const OnGoingJourney = lazy(() => import("./ongoing_journey/OnGoingJourney"));
const NoOngoingJourney = lazy(() => import("./no_ongoing_journey/NoOngoingJourney"));


const HomeWrapper = () => {
  const hasOngoing = useJourneyStatus();
  const { isLoading } = useQuery("fetchData", fetchData);
  return (
    <>
      {isLoading || hasOngoing === undefined ? (
        <CustomLoader size="60" />
      ) : !hasOngoing && hasOngoing !== undefined ? (
        <NoOngoingJourney />
      ) : (
        <OnGoingJourney />
        
      )}
    </>
  );
};

export default HomeWrapper;
