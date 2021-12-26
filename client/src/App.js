import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./search/app/index.js";

import AllFlight from "./Components/AllFlight";
import CreateFlight from "./Components/CreateFlight";
import UpdateFlight from "./Components/UpdateFlight";
import HomePage from "./Components/HomePage";
import AdminPanel from "./Components/AdminPanel";
import Forget from "./Components/Forget";

import Editprofile from "./Components/Editprofile";
import Home from "./homepage/homepage";
import Departure from "./Components/Departure";
import SeatingArrival from "./Components/SeatingArrival";
import SeatingDeparture from "./Components/SeatingDeparture";
import ChangeReservation from "./Components/ChangeRes";
import ChangeDeparture from "./Components/ChangeDep";
import ChangeSeats from "./Components/ChangeSeats";
import ChangeArrival from "./Components/ChangeArr";
import Return from "./Components/Return";
import Summary from "./Components/Summary";
import Seating from "./Components/seating";
import UserCancelFlight from "./cancel/UserCancelFlight";
import UserProfile from "./UserProfile";
import Signup from "./sign/Signup";
import ULogin from "./sign/Login";
import Password from "./passwordEdit";
import Pay from "./homepage/Payment/Pay";
import CheckoutForm from "./homepage/Payment/CheckoutForm";
import GuestLogin from "./Components/GuestLogin"


const AdminPanelElement = AdminPanel();
const AllFlightElement = AllFlight;
const CreateFlightElement = CreateFlight;
const UpdateFlightElement = UpdateFlight;

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/h" element={<Home />} />
          <Route exact path="/home/adminpanel" element={AdminPanelElement} />
          <Route exact path="/home/adminpanel/search" element={Search()} />
          <Route
            exact
            path="/home/adminpanel/flights"
            element={<AllFlightElement />}
          />
          <Route
            exact
            path="/home/adminpanel/create"
            element={<CreateFlightElement />}
          />
          <Route
            exact
            path="/home/adminpanel/flights/update"
            element={<UpdateFlightElement />}
          />
          <Route path="/h/departure" element={<Departure />} />
          <Route path="/h/changedep" element={<ChangeDeparture />} />
          <Route path="/h/changeres" element={<ChangeReservation />} />
          <Route path="/h/changeseats" element={<ChangeSeats />} />
          <Route path="/h/changearr" element={<ChangeArrival />} />
          <Route exact path="/h/return" element={<Return />} />

          <Route exact path="/h/seating" element={<Seating />} />
          <Route exact path="/h/seatingarr" element={<SeatingArrival />} />
          <Route exact path="/h/seatingdep" element={<SeatingDeparture />} />
          <Route exact path="/h/summary" element={<Summary />} />

          <Route exact path="/h/profile" element={<UserProfile />} />
          <Route
            exact
            path="/h/profile/reservations"
            element={<UserCancelFlight />}
          />
          <Route exact path="/h/profile/edit" element={<Editprofile />} />
          <Route exact path="/h/profile/password" element={<Password />} />

          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<ULogin />} />
          <Route exact path="/pay" element={<Pay />} />
          <Route exact path="/guest" element={<GuestLogin />} />

          <Route exact path="/r" element={<CheckoutForm />} />
          <Route exact path="/forget" element={<Forget />} />

        </Routes>
      </Router>
    </div>
  );
}
export default App;
