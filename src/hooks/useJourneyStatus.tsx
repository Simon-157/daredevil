// useJourneyStatus.js
import { useEffect, useState } from "react";
import useAuth from "@hooks/useAuth";
import { journeyController } from "../firebase/controllers/Journeys.controller";

const useJourneyStatus = () => {
  const { auth: authUser } = useAuth();
  const { hasJourneys } = journeyController();

  const [hasOngoing, setHasOngoing] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const status = await hasJourneys(authUser.user.id);
      setHasOngoing(status);
    }
    fetchData();
  }, [hasJourneys, authUser.user.id]);

  return hasOngoing;
};

export default useJourneyStatus;
