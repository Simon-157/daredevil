import useAuth from "@hooks/useAuth";
import ProfileStyles from "./Profile.module.css";
import defaultProfilePic from "@assets/images/default-profile-pic.png";

const Profile = () => {
  
  const { auth } = useAuth();

  return (
    <div className={ProfileStyles.profile}>
      <div className={ProfileStyles.profile_picture}>
        <img src={auth?.profile_picture || defaultProfilePic} alt="" />
      </div>
      <div className={ProfileStyles.profile_details}>
        <section>
          <small>username</small>
          <h2>{auth.name}</h2>
        </section>
        <section>
          <small>email</small>
          <h2>{auth.email}</h2>
        </section>
        <section>
          <small>joined</small>
          <h2>{auth.joined_at}</h2>
        </section>
      </div>
    </div>
  );
};

export default Profile;
