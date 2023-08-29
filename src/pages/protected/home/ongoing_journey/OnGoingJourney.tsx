import OngoingJourneyStyles from "./OngoingJourney.module.css";
import darkBell from "@assets/images/dark-bell.png";
import darkClock from "@assets/images/dark-clock.png";
import { journeyController } from "../../../../firebase/controllers/Journeys.controller";
import { JourneyDare } from "../../../../types/FreakPoolType";
import { Journey, JourneyMetricsType } from "../../../../types/UserType";
import { useEffect, useState } from "react";
import { CorrectIcon, SwapIcon, AbortIcon, BulbIcon } from "../../../../assets/icons/Icons";
import Button from "../../../../components/button/Button";
import CircularProgressBar from "../../../../components/progress_bar/circular_progress_bar/CircularProgressBar";
import useAuth from "../../../../hooks/useAuth";
const OnGoingJourney = () => {

  const { getJourneysByUser } = journeyController();
  const { auth } = useAuth();
  const [currentJourneys, setCurrentJourneys] = useState<Journey[]>([]); // Specify the type here

  useEffect(() => {
    const fetchData = async () => {
      const journeys = await fetchAndFilterJourneys();
      setCurrentJourneys(journeys);
    };

    fetchData(); // Call the async function
  }, []);

  // Fetch journeys asynchronously and then filter
  const fetchAndFilterJourneys = async () => {
    const journeys = await getJourneysByUser(auth!.user.id);
    const currentDate = new Date().toISOString().split("T")[0];
    const filteredJourneys = journeys.filter((journey: Journey) => {
      const journeyStartDate = journey.start_date.toDate();
      const journeyStartDateString = journeyStartDate.toISOString().split("T")[0];
      return journeyStartDateString === currentDate;
    });
    return filteredJourneys;
  };


  // Compute metrics for each current journey
  const metrics: JourneyMetricsType[] = currentJourneys?.map((journey: Journey) => {
    const numDares:number = journey.journey_dares.length
    const swaps: number = journey.swaps_made;
    const jname:string = journey.name
    const miles = journey.milestone;
    const passed: number = journey.journey_dares.filter((dare: JourneyDare) => dare.milestone === "passed").length;
    const aborted: number = journey.journey_dares.filter((dare: JourneyDare) => dare.milestone === "aborted").length;
    const missed: number = journey.journey_dares.filter((dare: JourneyDare) => dare.milestone === "missed").length;

    const startDate = journey.start_date.toDate();
    const endDate = journey.end_date.toDate();
    const timeLeft = endDate.getTime() - startDate.getTime();

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // const timeLeftFormatted = `${hours}:${minutes}:${seconds}`;
    const timeLeftFormatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return {
      totalDares:numDares,
      journeyId: journey.id,
      name: jname,
      swapsMade: swaps,
      milestone: miles,
      passedFreaks: passed,
      abortedFreaks: aborted,
      missedFreaks: missed,
      timeLeftFormatted: timeLeftFormatted,
    };
  });

  console.log(metrics);
  


  return (
    <div className={OngoingJourneyStyles.wrapper}>
      <div className={OngoingJourneyStyles.mission_announcement}>
        <img src={darkBell} alt="" />
        <h1>Today's Mission</h1>
      </div>
      <div className={OngoingJourneyStyles.mission_display}>
        <h2>Ask your crush out</h2>
        <div className={OngoingJourneyStyles.stats}>
          statistics
          {/* TODO : Map the metric for the statistics here with style*/}

        </div>
        <div className={OngoingJourneyStyles.mission_content}>
          <h1>Ask your crush out</h1>
          <Button
            style={{
              backgroundColor: "rgb(255 255 255 / 0.1)",
              border: "none",
              color: "var(--app-white)",
            }}  type={""}          >
            description
          </Button>
        </div>
        <div className={OngoingJourneyStyles.mission_stats}>
          <CircularProgressBar total={metrics.at(0)?.totalDares!} chunk={metrics.at(0)?.passedFreaks!} label="completed" bgColor={""} arcColor={""} />
          <CircularProgressBar total={metrics.at(0)?.totalDares!} chunk={metrics.at(0)?.swapsMade!} label="swaps" bgColor={""} arcColor={""} />
          <CircularProgressBar total={metrics.at(0)?.totalDares!} chunk={metrics.at(0)?.abortedFreaks!} label="aborted" bgColor={""} arcColor={""} />
        </div>
      </div>
      <div className={OngoingJourneyStyles.timer_action_buttons}>
        <img src={darkClock} alt={darkClock} />

        {/* TODO : replace with timeLeftFormatted */}
        <h1> {metrics.at(0)?.timeLeftFormatted}</h1>
        <div className={OngoingJourneyStyles.action_buttons}>
          <Button
            style={{
              backgroundColor: "rgba(191,249,231,0.1)",
              minWidth: "2rem",
              border: "none",
              color: "var(--app-green)",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
            }}  type={""}          >
            <CorrectIcon /> <p>done</p>
          </Button>
          <Button
            style={{
              backgroundColor: "rgba(250,228,173,0.1)",
              minWidth: "2rem",
              border: "none",
              color: "var(--app-yellow)",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
            }}  type={""}          >
            <SwapIcon /> <p>swap</p>
          </Button>
          <Button
            style={{
              backgroundColor: "rgba(244,152,103,0.1)",
              minWidth: "2rem",
              border: "none",
              color: "var(--app-orange)",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
            }}  type={""}          >
            <AbortIcon /> <p>abort</p>
          </Button>
        </div>
      </div>
      <div className={OngoingJourneyStyles.shared_experience_prompt}>
        <article>
          <BulbIcon />
          <small>
            27 people have completed this challenge; they have share their
            experience and tips
          </small>
        </article>
        <br />
        <Button style={{ padding: "0.5rem" }}  type={""}>read</Button>
      </div>
    </div>
  );
};

export default OnGoingJourney;
