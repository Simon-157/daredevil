import useJourneyStatus from "../../../hooks/useJourneyStatus";
import NoOngoingJourney from "./no_ongoing_journey/NoOngoingJourney";
import OnGoingJourney from "./ongoing_journey/OnGoingJourney";

const Home = () => {
  const hasOngoing = useJourneyStatus();
  const ongoingJourneyComponent = <OnGoingJourney />;
  const noOngoingJourneyComponent = <NoOngoingJourney />;
  return hasOngoing ? ongoingJourneyComponent : noOngoingJourneyComponent;
};


export default Home;