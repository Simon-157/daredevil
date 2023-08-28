import Button from "../../components/button/Button";
import { useFirebaseAuth } from "../../firebase/auth/auth";

const Homepage = () => {
  // const { auth } = useAuth();
  const {signInWithGoogle, user} = useFirebaseAuth()

  
  return (
  <Button  type={""} onClick={signInWithGoogle}>

    Google    
  </Button>

  )
};

export default Homepage;
