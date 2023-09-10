//libraries
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// styles
import AppStyles from "./App.module.css";

// component
import CustomChallenge from "./pages/protected/custom_challenge/CustomChallenge";
import Login from "./pages/auth/login/Login";
import PageNotFound from "./pages/errors/not_found/PageNotFound";
import Homepage from "./pages/homepage/Homepage";
import Protected from "./pages/protected/Protected";
import CreateDareJourney from "./pages/protected/create_dare_journey/CreateDareJourney";
import Darepool from "./pages/protected/darepool/Darepool";
import Home from "./pages/protected/home/Home";
import JourneyDetails from "./pages/protected/journeys/JourneyDetails";
import Journeys from "./pages/protected/journeys/Journeys";
import Profile from "./pages/protected/profile/Profile";
import Settings from "./pages/protected/settings/Settings";
import { AuthProvider } from "./contexts/AuthContext";


//constants
import { HOMEPAGE, LOGIN, DASHBOARD, HOME, JOURNEYS, JOURNEYDETAILS, CHALLENGE, DAREPOOL, PROFILE, SETTINGS, CREATE_DARE_JOURNEY, PAGE_NOT_FOUND } from "./utils/routes";
import { ModalProvider } from "./contexts/ModalContext";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
      <div className={AppStyles.app}>
        <Router>
          <Routes>
            <Route path={HOMEPAGE} element={<Homepage />} />
            <Route path={LOGIN} element={<Login />} />
            {/* <Route path={REGISTER} element={<Register />} /> */}
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
      </ModalProvider>
    </AuthProvider>
  );
}
export default App;
