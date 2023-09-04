import React from "react";
import JourneysStyles from "./Journeys.module.css";
import CircularProgressBar from "../../../components/progress_bar/circular_progress_bar/CircularProgressBar";
import useJourneyService from "../../../hooks/useUserJourneys";
import { Journey } from "../../../types/UserType";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../../../components/loader/loader";
type JourneysProps = {};

const Journeys: React.FC<JourneysProps> = () => {
  const {auth:authUser} = useAuth()
  const { journeys, isLoading } = useJourneyService(authUser!.user.id);
  // const { auth } = useAuth();
  const navigate = useNavigate();

  const completedJourneys = journeys?.filter(
    (journey: Journey) => journey.milestone === "completed"
  );

  const ongoingJourneys = journeys?.filter(
    (journey: Journey) => journey.milestone === "ongoing"
  );

  const abandonedJourneys = journeys?.filter(
    (journey: Journey) => journey.milestone === "abandoned"
  );

  const handleJourneyClick = (journey: Journey) => {
    navigate(`/dashboard/journeys/${journey.id}`, { state: { journey } });
  };

  if(isLoading) return <CustomLoader />

  return (
    <div className={JourneysStyles.container}>
      <div className={JourneysStyles.stats}>
      <div className={JourneysStyles.completed}>
          <div className={JourneysStyles.metric}>
            <div className={JourneysStyles.metricValue}>
              <CircularProgressBar
                chunk={ongoingJourneys!.length}
                total={journeys!.length}
                label="Ongoing" bgColor={"white"} arcColor={"var(--app-yellow)"}              />
            </div>
          </div>
        </div>
        <div className={JourneysStyles.completed}>
          <div className={JourneysStyles.metric}>
            <div className={JourneysStyles.metricValue}>
              <CircularProgressBar
                chunk={completedJourneys!.length}
                total={journeys!.length}
                label="Completed" bgColor={"white"} arcColor={"var(--app-hover-green)"}              />
            </div>
          </div>
        </div>
        <div className={JourneysStyles.abandoned}>
          <div className={JourneysStyles.metric}>
            <div className={JourneysStyles.metricValue}>
              <CircularProgressBar
                chunk={abandonedJourneys!.length}
                total={journeys!.length}
                label="Abandoned" bgColor={"white"} arcColor={"var(--app-orange)"}              />
            </div>
          </div>
        </div>
      </div>
      <div className={JourneysStyles.journeyList}>
        {journeys?.map((journey: Journey) => (
          <div
            className={JourneysStyles.journey}
            key={journey.id}
            onClick={() => handleJourneyClick(journey)}

            style={{
              borderColor:
                journey.milestone === "completed"
                  ? "var(--app-green)"
                  : journey.milestone === "ongoing"
                  ? "var(--app-yellow)"
                  : "var(--app-orange)",
            }}
            
           
          >
            <h2>{journey.name}</h2>
            <br />
            <small
            style={{
              color:
                journey.milestone === "completed"
                  ? "var(--app-green)"
                  : journey.milestone === "ongoing"
                  ? "var(--app-yellow)"
                  : "var(--app-orange)",
            }}
             
            >
              {journey.milestone}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journeys;
