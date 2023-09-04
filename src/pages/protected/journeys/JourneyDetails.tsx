import React from "react";
import JourneysStyles from "./Journeys.module.css";
// import { StarIcon } from "../../../assets/icons/Icons";
import { Journey } from "../../../types/UserType";
import { JourneyDare } from "../../../types/FreakPoolType";
import { useLocation } from "react-router-dom";

type JourneyDetailsProps = {

};

const JourneyDetails: React.FC<JourneyDetailsProps> = () => {

  const location = useLocation();

  // Check if state exists and extract the journey
  const journey = location.state?.journey as Journey;

  return (
    <div
      style={{ color: "white" }}
      className={JourneysStyles.journey_details_wrapper}
    >
      <div className={JourneysStyles.journey_details_metadata}>
        <h1>{journey?.name}</h1>
        <br />
        <div style={{ columns: 2 }}>
          <section>
            <small>swaps made</small>
            <p>{journey?.swaps_made}</p>
          </section>
          <section>
            <small>mlestone</small>
            <p>{journey?.milestone}</p>
          </section>
        </div>
      </div>
      <br />
      <div className={JourneysStyles.daresList}>
        {journey?.journey_dares?.map((dare: JourneyDare) => (
          <div key={dare.id!} className={JourneysStyles.dare}>
            <h2>{dare.short_name}</h2>
            <small
              style={{
                color: `${
                  dare?.milestone === "missed"
                    ? "var(--app-yellow)"
                    : dare?.milestone === "passed"
                    ? "var(--app-green)"
                    : "var(--app-orange)"
                }`,
              }}
            >
              {dare?.milestone!}
            </small>
            <section className={JourneysStyles.stars}>
              {/* {dare?.rating! &&
                Array(dare.rating!)
                  .fill("")
                  .map((_, i) => (
                    <p key={i}>
                      <StarIcon />
                    </p>
                  ))} */}
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyDetails;
