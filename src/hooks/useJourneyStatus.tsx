// useJourneyStatus.js
import { useEffect, useState } from "react";
import { journeyController } from "../firebase/controllers/Journeys.controller";
import useAuth from "./useAuth";

const useJourneyStatus = () => {
  const { auth: authUser } = useAuth();
  const { hasJourneys } = journeyController();

  const [hasOngoing, setHasOngoing] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const status = await hasJourneys(authUser!.user.id);
      setHasOngoing(status);
    }
    fetchData();
  }, [hasJourneys, authUser!.user.id]);

  return hasOngoing;
};

export default useJourneyStatus;
