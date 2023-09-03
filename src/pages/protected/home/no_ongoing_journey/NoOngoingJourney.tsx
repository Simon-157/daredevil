//components
import Cover from "@assets/images/man-standing-with-hands-in-pockets.png";

import NoOngoingJourneyStyles from "./NoOngoingJourney.module.css";

import { useNavigate } from "react-router-dom";
import Button from "../../../../components/button/Button";
import {useAuth} from "../../../../hooks/useAuth";

const NoDareJourney = () => {

  const {auth} = useAuth()
  
  const navigate = useNavigate();


  const buttonStyle = {
    marginBottom: "1rem",
  };
  const handleClick = () => {
    navigate("/dashboard/create-dare-journey");
  };

  return (
    <main className={NoOngoingJourneyStyles.home__container}>
      <div className={NoOngoingJourneyStyles.home__wrapper}>
        <section className={NoOngoingJourneyStyles.home__wrapper__text}>
          <h2>
            Welcome, <span>{auth?.user.name}</span>
          </h2>
          <p>
            umm, it seems you haven't created a{" "}
            <span style={{ color: "var(--app-yellow)" }}>dare journey</span> yet
          </p>
          <br />
          <Button
            style={buttonStyle}
            children={<p>create dare journey</p>}
            type={"solid"}
            onClick={handleClick}
          />{" "}
          <br />
          <a href="" style={{ color: "var(--app-yellow)" }}>
            what's a dare journey?
          </a>
        </section>
        <section className={NoOngoingJourneyStyles.home__wrapper__image}>
          <img src={Cover} alt="Stage One" />
        </section>
      </div>
    </main>
  );
};

export default NoDareJourney;
