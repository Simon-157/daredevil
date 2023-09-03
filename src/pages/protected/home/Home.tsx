import HomeWrapper from "./HomeWrapper"; 
import { Suspense } from "react";

const Home = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeWrapper />
    </Suspense>
  );
};

export default Home;
