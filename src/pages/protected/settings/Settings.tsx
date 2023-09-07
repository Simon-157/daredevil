
import { useFirebaseAuth } from "../../../bass/auth/auth";
import Button from "../../../components/button/Button";
import ProfileStyles from "../profile/Profile.module.css";

const Settings = () => {
  const {user} = useFirebaseAuth()

  console.log(user?.photoURL);
  
  const btnStyles = {

    backgroundColor: "#F498671A",
    border:"1px solid rgba(244, 152, 103, 0.10)",
    color:"#F49867"

  }

  return (
    <div className={ProfileStyles.profile}>
      <div className={ProfileStyles.profile_picture}>
        <img src={user?.photoURL || ""} alt="https://i.pravatar.cc/75" />
      </div>
      <div className={ProfileStyles.profile_details}>
        <section>
          <small>username</small>
          <h2>{user?.displayName}</h2>
        </section>
        <section>
          <small>email</small>
          <h2>{user?.email}</h2>
        </section>
        <section>
          <small>joined</small>
          <h2>01-02-2023</h2>
        </section>
        <div className={ProfileStyles.edit_btns}> 

          <Button children={<h3>update</h3>} type={"solid"} />
          <Button children={<h3>delete</h3>} type={""} style={btnStyles}/>
        </div>
      </div>

    </div>
  );
};

export default Settings;
