import React from "react";
import JourneysStyles from "./Journeys.module.css";

type JourneysProps = {};

const Journeys: React.FC<JourneysProps> = () => {
  // const { auth } = useAuth();
  // const navigate = useNavigate();
  // const completedJourneys = auth.journeys.documents.filter(
  //   (journey: Journey) => journey.milestone === "completed"
  // );
  // const abandonedJourneys = auth.journeys.documents.filter(
  //   (journey: Journey) => journey.milestone === "abandoned"
  // );

  // const handleJourneyClick = (journey: Journey) => {
  //   navigate(`/dashboard/journeys/${journey.id}`, { state: { journey } });
  // };

  return (
    <div className={JourneysStyles.container}>
      {/* <div className={JourneysStyles.stats}>
        <div className={JourneysStyles.completed}>
          <div className={JourneysStyles.metric}>
            <div className={JourneysStyles.metricValue}>
              <CircularProgressBar
                chunk={completedJourneys.length}
                total={auth.journeys.documents.length}
                label="Completed" bgColor={""} arcColor={""}              />
            </div>
          </div>
        </div>
        <div className={JourneysStyles.abandoned}>
          <div className={JourneysStyles.metric}>
            <div className={JourneysStyles.metricValue}>
              <CircularProgressBar
                chunk={abandonedJourneys.length}
                total={auth.journeys.documents.length}
                label="Abandoned" bgColor={""} arcColor={""}              />
            </div>
          </div>
        </div>
      </div>
      <div className={JourneysStyles.journeyList}>
        {auth.journeys.documents.map((journey: Journey) => (
          <div
            className={JourneysStyles.journey}
            key={journey.id}
            onClick={() => handleJourneyClick(journey)}
            style={{
              borderColor: `${
                journey.milestone === "completed"
                  ? "var(--app-green)"
                  : "var(--app-orange)"
              }`,
            }}
          >
            <h2>{journey.name}</h2>
            <br />
            <small
              style={{
                color: `${
                  journey.milestone === "completed"
                    ? "var(--app-green)"
                    : "var(--app-orange)"
                }`,
              }}
            >
              {journey.milestone}
            </small>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Journeys;
