import { journeyController } from '../bass/controllers/Journeys.controller';
import { useQuery } from 'react-query';

const {getJourneysByUser} = journeyController()
const fetchJourneysByUser = async (userId:string) => {
  const userJourneys = await getJourneysByUser(userId);
  return userJourneys;
};

const useJourneyService = (userId:string) => {
  const { data: journeys, isLoading, isError, error } = useQuery(
    ['journeys', userId],
    () => fetchJourneysByUser(userId),
    {
      enabled: !!userId, // Fetch data only if userId is truthy
    }
  );

  return { journeys, isLoading, isError, error };
};

export default useJourneyService;
