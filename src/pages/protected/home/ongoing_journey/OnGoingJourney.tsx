// library hooks and custom hooks
import { useEffect, useState } from "react";

// components

// assests for this page
import darkBell from "@assets/images/dark-bell.png";
import darkClock from "@assets/images/dark-clock.png";
import OngoingJourneyStyles from "./OngoingJourney.module.css";
import { CorrectIcon, SwapIcon, AbortIcon, BulbIcon } from "../../../../assets/icons/Icons";
import Button from "../../../../components/button/Button";
import CircularProgressBar from "../../../../components/progress_bar/circular_progress_bar/CircularProgressBar";
import { journeyController } from "../../../../bass/controllers/Journeys.controller";
import { useAuth } from "../../../../hooks/useAuth";
import { useSnackbar } from "../../../../hooks/useSnackbar";
import { JourneyDare } from "../../../../types/FreakPoolType";
import { Journey, JourneyMetricsType } from "../../../../types/UserType";

// types definitions

const OnGoingJourney = () => {
  const { showSnackbar, snackbar } = useSnackbar();
  const { getJourneysByUser, updateJourneyDares } = journeyController();
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
      return currentDate <= journey.end_date.toDate().toISOString().split("T")[0];
    });
    return filteredJourneys;
  };


  // Compute metrics for each current journey
  const metrics: JourneyMetricsType[] = currentJourneys?.map((journey: Journey) => {
    const numDares: number = journey.journey_dares.length
    const swaps: number = journey.swaps_made;
    const jname: string = journey.name
    const miles = journey.milestone;
    const passed: number = journey.journey_dares.filter((dare: JourneyDare) => dare.milestone === "passed").length;
    const aborted: number = journey.journey_dares.filter((dare: JourneyDare) => dare.milestone === "aborted").length;
    const missed: number = journey.journey_dares.filter((dare: JourneyDare) => dare.milestone === "missed").length;
    const currentMission: JourneyDare[] = journey.journey_dares.filter((dare: JourneyDare) => dare.milestone === "ongoing");

    const startDate = journey.start_date.toDate();
    const endDate = journey.end_date.toDate();
    const time = endDate.getTime() - startDate.getTime();

    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    // const timeLeftFormatted = `${hours}:${minutes}:${seconds}`;
    const timeLeftFormatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return {
      totalDares: numDares,
      journeyId: journey.id,
      name: jname,
      swapsMade: swaps,
      milestone: miles,
      passedFreaks: passed,
      abortedFreaks: aborted,
      missedFreaks: missed,
      timeLeftFormatted: timeLeftFormatted,
      currentMission: currentMission
    };
  });

  const [timeLeft, setTimeLeft] = useState(metrics.at(0)?.timeLeftFormatted);

  const handleClick = async (key: string) => {
    switch (key) {
      case "done":
        const successDone = await updateJourneyDares(metrics.at(0)?.journeyId!, metrics.at(0)?.currentMission[0].id!, key = "done");
        successDone ? showSnackbar("Dare marked passed", "success") : showSnackbar("Couldn't mark done", "error");
        break;
      case "swap":
        const successSwap = await updateJourneyDares(metrics.at(0)?.journeyId!, metrics.at(0)?.currentMission[0].id!, key = "swap");
        successSwap ? showSnackbar("Dare swapped success", "info") : showSnackbar("Couldn't swap dare", "error");
        break;
      case "abort":
        const successAbort = await updateJourneyDares(metrics.at(0)?.journeyId!, metrics.at(0)?.currentMission[0].id!, key = "abort");
        successAbort ? showSnackbar("Dare aborted success", "info") : showSnackbar("Couldn't abort dare", "error");
        break;
      default:
        break;
    }
  };
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const startDate = currentJourneys[0]?.start_date.toDate();
      const endDate = currentJourneys[0]?.end_date.toDate();
      const currentTime = new Date();

      if (startDate && endDate && currentTime < endDate) {
        const timeLeftMillis = endDate.getTime() - currentTime.getTime();
        const hours = Math.floor(timeLeftMillis / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeftMillis % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeftMillis % (1000 * 60)) / 1000);

        const timeLeftFormatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        setTimeLeft(timeLeftFormatted);
      } else {
        // Journey has ended, clear the interval
        clearInterval(intervalId);
        setTimeLeft("00:00:00");
      }
    }, 1000); // Update time every second

    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, [currentJourneys]);


  return (
    <div className={OngoingJourneyStyles.wrapper}>
      <div className={OngoingJourneyStyles.mission_announcement}>
        <img src={darkBell} alt="" />
        <h1>Today's Mission</h1>
      </div>
      <div className={OngoingJourneyStyles.mission_display}>
        <h2>{metrics.at(0)?.name!} Journey</h2>
        {/* <div className={OngoingJourneyStyles.stats}>
      statistics

    </div> */}
        <div className={OngoingJourneyStyles.mission_content}>
          <h1>"{metrics.at(0)?.currentMission[0]? metrics.at(0)?.currentMission[0]?.short_name : "Add more freaks or create new journey"}"</h1>
          <Button
            style={{
              backgroundColor: "rgb(255 255 255 / 0.1)",
              border: "none",
              color: "var(--app-white)",
            }} type={""}>
            {metrics.at(0)?.currentMission[0] ? metrics.at(0)?.currentMission[0].description : <h2>You completed all freaks 🏄🎉🎉</h2>}
        </Button>
      </div>
      <div className={OngoingJourneyStyles.mission_stats}>
        {metrics.at(0)?.totalDares != undefined &&
          <><CircularProgressBar total={metrics.at(0)?.totalDares!} chunk={metrics.at(0)?.passedFreaks!} label="passed" bgColor={"white"} arcColor={"var(--app-green)"} />
            <CircularProgressBar total={metrics.at(0)?.totalDares!} chunk={metrics.at(0)?.swapsMade!} label="swaps" bgColor={"white"} arcColor={"var(--app-yellow)"} />
            <CircularProgressBar total={metrics.at(0)?.totalDares!} chunk={metrics.at(0)?.abortedFreaks!} label="aborted" bgColor={"white"} arcColor={"var(--app-orange)"} />
          </>}</div>
    </div><div className={OngoingJourneyStyles.timer_action_buttons}>
        <img src={darkClock} alt={darkClock} />

        {/* TODO : replace with timeLeftFormatted */}
        <h3> Time remaining</h3>
        <h1>{timeLeft}</h1>
        <div className={OngoingJourneyStyles.action_buttons}>
          {snackbar}
          <Button
            onClick={async () => { await handleClick("done"); } }
            style={{
              backgroundColor: "rgba(191,249,231,0.1)",
              minWidth: "2rem",
              border: "none",
              color: "var(--app-green)",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
            }} type={""}>
            <CorrectIcon /> <p>done</p>
          </Button>
          <Button
            onClick={async () => { await handleClick("swap"); } }
            style={{
              backgroundColor: "rgba(250,228,173,0.1)",
              minWidth: "2rem",
              border: "none",
              color: "var(--app-yellow)",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
            }} type={""}>
            <SwapIcon /> <p>swap</p>
          </Button>
          <Button
            onClick={async () => { await handleClick("abort"); } }
            style={{
              backgroundColor: "rgba(244,152,103,0.1)",
              minWidth: "2rem",
              border: "none",
              color: "var(--app-orange)",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
            }} type={""}>
            <AbortIcon /> <p>abort</p>
          </Button>
        </div>
      </div><div className={OngoingJourneyStyles.shared_experience_prompt}>
        <article>
          <BulbIcon />
          <small>
            27 people have completed this challenge; they have share their
            experience and tips
          </small>
        </article>
        <Button style={{ padding: "0.5rem" }} type={""}>read</Button>
      </div>
    </div>
  );
};

export default OnGoingJourney;
