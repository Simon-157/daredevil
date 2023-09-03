import Button from "../../components/button/Button";
import styles from "./home.module.css"


const Home = () => {
  return (
    <div className={styles.comming__soon}>
      <h1>Coming Soon</h1>
      <span>Pushing you out of your comfort zone.
      Stay tuned for updates!</span>
        <p>for the meantime, explore a sneak of it</p>

      <Button  type="outlined" ><a href="/login">Explore</a></Button>

    </div>
  );
};

export default Home;
