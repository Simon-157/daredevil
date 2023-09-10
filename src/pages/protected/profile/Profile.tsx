import { useFirebaseAuth } from "../../../bass/auth/auth";
import ProfileStyles from "./Profile.module.css";

const Profile = () => {
  const {user} = useFirebaseAuth()

  console.log(user?.photoURL);
  
  return (
    <div className={ProfileStyles.profile}>
      <div className={ProfileStyles.profile_picture}>
        <img src={user?.photoURL || "https://i.pravatar.cc/75"} alt="profile" />
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
          <small>Account key</small>
          <h2>{user?.uid}</h2>
        </section>
      </div>
    </div>
  );
};

export default Profile;
