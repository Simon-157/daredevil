import React from "react";
import { useLocation } from "react-router-dom";
import { Journey, Journeydare } from "@types/UserType";
import JourneysStyles from "./Journeys.module.css";
import { StarIcon } from "@assets/icons/Icons";

type JourneyDetailsProps = {};

const JourneyDetails: React.FC<JourneyDetailsProps> = () => {
  const location = useLocation();
  const journey = location.state?.journey as Journey;

  const passedDares = journey?.dares.filter(
    (dare:any) => dare.milestone! === "passed"
  ).length;
  const abortedDares = journey?.dares.filter(
    (dare:any) => dare.milestone! === "passed"
  ).length;

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
            <small>start date</small>
            <p>{journey?.startDate}</p>
          </section>
          <section>
            <small>end date</small>
            <p>{journey?.endDate}</p>
          </section>
          <section>
            <small>swaps made</small>
            <p>{journey?.swapsMade}</p>
          </section>
          <section>
            <small>mlestone</small>
            <p>{journey?.milestone}</p>
          </section>
          <section>
            <small>passed dares</small>
            <p>{passedDares}</p>
          </section>
          <section>
            <small>aborted dares</small>
            <p>{abortedDares}</p>
          </section>
        </div>
      </div>
      <br />
      <div className={JourneysStyles.daresList}>
        {journey?.dares?.map((dare: Journeydare) => (
          <div key={dare.id!} className={JourneysStyles.dare}>
            <h2>{dare.name}</h2>
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
              {dare.rating! &&
                Array(dare.rating!)
                  .fill("")
                  .map((_, i) => (
                    <p key={i}>
                      <StarIcon />
                    </p>
                  ))}
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyDetails;
