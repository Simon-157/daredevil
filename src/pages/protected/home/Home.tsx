import { useQuery } from "react-query";
import CustomLoader from "../../../components/loader/loader";
import useJourneyStatus from "../../../hooks/useJourneyStatus";
import { fetchData } from "../../../utils/functions";
import NoOngoingJourney from "./no_ongoing_journey/NoOngoingJourney";
import OnGoingJourney from "./ongoing_journey/OnGoingJourney";

const Home = () => {
  // Use the useQuery hook to fetch data with loading state handling
  const { isLoading } = useQuery("fetchData", fetchData);

  if (isLoading) {
    return <div><CustomLoader size={60} /></div>;
  }
  const hasOngoing = useJourneyStatus();
  const ongoingJourneyComponent = <OnGoingJourney />;
  const noOngoingJourneyComponent = <NoOngoingJourney />;
  return hasOngoing ? ongoingJourneyComponent : noOngoingJourneyComponent;
};


export default Home;