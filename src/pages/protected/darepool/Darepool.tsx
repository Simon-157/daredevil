import DarepoolStyles from "./Darepool.module.css";
import useAuth from "@hooks/useAuth";
import { API_URL } from "@utils/constants";
import axios, { AxiosResponse } from "axios";

const Darepool = () => {
  /**
   * TODO: check if darepool exists in auth object; if not fetch from db and cache it
   * TODO: implement a throttling fetch mechanism -- fetch more as user scrolls [NOT PART OF SUBMISSION]
   */

  const { auth } = useAuth();

  if (!auth.darepool) {
    // fetch darepools from db
  }
  console.log(auth);
  return (
    <div className={DarepoolStyles.darepool}>
      <div className={DarepoolStyles.stats}>
        <h2>100 dares</h2>
      </div>
      <div className={DarepoolStyles.dareList}>
        <article className={DarepoolStyles.dare}>
          <h2>Dare Name</h2>
          <small>description</small>
        </article>
      </div>
    </div>
  );
};

export default Darepool;
