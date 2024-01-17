import NavbarMain from "./Pages/NavbarMain";
import WelcomePage from "./Pages/WelcomePage";

import { Route, Routes, BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./Components/LoginPage";
import Home from "./Pages/Home";
import CourtReg from "./Pages/CourtReg";
import MyCourts from "./Pages/MyCourts";
import SingleCourtPage from "./Pages/SingleCourtPage";
import UserCourtPage from "./Pages/UserCourtPage";
import { Authorization, LoginpageAuth } from "./Authorization/Authorization";
import MyBookings from "./Pages/MyBookings";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route element={<LoginpageAuth />}>
            <Route path="/" element={<WelcomePage />} />
          </Route>
          <Route element={<Authorization/>}>
          <Route path="/home" element={<Home />} />
          <Route path="/CourtRegistration" element={<CourtReg />} />
          <Route path="/MyCourts" element={<MyCourts />} />
          <Route path="/openCourtEdit/:id" element={<SingleCourtPage />} />
          <Route path="/courtBooking/:id" element={<UserCourtPage />} />
          <Route path="/MyBookings" element={<MyBookings/>} />
          


          </Route>
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
