//libraries
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// styles
import AppStyles from "./App.module.css";

// component
import PageNotFound from "@pages/errors/not_found/PageNotFound";
import Homepage from "@pages/homepage/Homepage";
import Protected from "@pages/protected/Protected";
import Home from "@pages/protected/home/Home";
import CreateDareJourney from "@pages/protected/create_dare_journey/CreateDareJourney";
import Darepool from "@pages/protected/darepool/Darepool";
import Profile from "@pages/protected/profile/Profile";
import Journeys from "@pages/protected/journeys/Journeys";
import Settings from "@pages/protected/settings/Settings";
import Login from "@pages/auth/login/Login";
import JourneyDetails from "@pages/protected/journeys/JourneyDetails";



//constants
import {
  CREATE_DARE_JOURNEY,
  DASHBOARD,
  HOMEPAGE,
  HOME,
  PAGE_NOT_FOUND,
  SETTINGS,
  PROFILE,
  DAREPOOL,
  JOURNEYS,
  CHALLENGE,
  LOGIN,
  JOURNEYDETAILS,
  REGISTER
} from "@utils/routes";

import { AuthProvider } from "@contexts/AuthContext";
import CustomChallenge from "./pages/protected/custom_challenge/CustomChallenge";
import Register from "@pages/auth/register/Register";

function App() {
  return (
    <AuthProvider>
      <div className={AppStyles.app}>
        <Router>
          <Routes>
            <Route path={HOMEPAGE} element={<Homepage />} />
            <Route path={LOGIN} element={<Login />} />
            <Route path={REGISTER} element={<Register />} />
            <Route path={DASHBOARD} element={<Protected />}>
              <Route path={HOME} element={<Home />} />
              <Route path={JOURNEYS} element={<Journeys />} />
              <Route path={JOURNEYDETAILS} element={<JourneyDetails />} />
              <Route path={CHALLENGE} element={<CustomChallenge />} />
              <Route path={DAREPOOL} element={<Darepool />} />
              <Route path={PROFILE} element={<Profile />} />
              <Route path={SETTINGS} element={<Settings />} />
              <Route
                path={CREATE_DARE_JOURNEY}
                element={<CreateDareJourney />}
              />
            </Route>
            <Route path={PAGE_NOT_FOUND} element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}
export default App;
