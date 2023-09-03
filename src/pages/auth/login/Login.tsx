import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../../../bass/auth/auth";
import Button from "../../../components/button/Button";
import { GridOverlay } from "../../../components/overlay/Overlay";
import loginStyles from "./login.module.css";
import google from "../../../assets/google.svg";
import email from "../../../assets/mail.svg";
import {useAuth} from "../../../hooks/useAuth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { auth: authUser } = useAuth(); // Assuming you get user data from useAuth hook
  const { signInWithGoogle } = useFirebaseAuth(); // Assuming you get user data from useFirebaseAuth hook

  useEffect(() => {
    // Check if there's an authenticated user
    if (authUser) {
      navigate("/dashboard/home");
    }
  }, []);

  const handleSubmit = async () => {
    try {
      await signInWithGoogle();
       navigate("/dashboard/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={loginStyles.wrapper}>
      <GridOverlay />

      <div className={loginStyles.socialBtn}>
        <div className={loginStyles.welcome}>
          <h1>Welcome to DareDevil</h1>
          <p>
            create an account or <span>log in </span>with an existing account
            to start
          </p>
        </div>
        <Button
          type="outlined"
          style={{
            display: "flex",
            gap: "1rem",
            border: "1px solid #4f4040",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.5em",
            width: "25rem",
            flexGrow: "1",
            backgroundColor: "#252526",
          }}
          onClick={handleSubmit}
        >
          <img src={email} alt="google_logo" width={15} height={15} />
          <p>Login with your Email</p>
        </Button>
        <Button
          type="solid"
          style={{
            display: "flex",
            gap: "1rem",
            border: "1px solid #4f4040",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.5em",
            width: "25rem",
            flexGrow: "1",
          }}
          onClick={handleSubmit}
        >
          <img src={google} alt="google_logo" width={15} height={15} />
          <p>Continue with Google</p>
        </Button>
      </div>
    </div>
  );
};

export default Login;
