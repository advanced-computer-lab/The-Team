import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./search/app/index.js";

import AllFlight from "./Components/AllFlight";
import CreateFlight from "./Components/CreateFlight";
import UpdateFlight from "./Components/UpdateFlight";
import HomePage from "./Components/HomePage";
import AdminPanel from "./Components/AdminPanel";

import Editprofile from "./Components/Editprofile";
import Home from "./homepage/homepage";
import Departure from "./Components/Departure";
import Return from "./Components/Return";
import Summary from "./Components/Summary";
import Seating from "./Components/seating";
import Login from "./login";
import UserCancelFlight from "./cancel/UserCancelFlight";
import UserProfile from "./UserProfile";
import Signup from "./sign/Signup";
import ULogin from "./sign/Login";
import Pay from "./homepage/Payment/Pay";
import CheckoutForm from "./homepage/Payment/CheckoutForm";


const HomePageElement = HomePage();
const AdminPanelElement = AdminPanel();
const AllFlightElement = AllFlight;
const CreateFlightElement = CreateFlight;
const UpdateFlightElement = UpdateFlight;

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/h" element={<Home />} />
          <Route exact path="/home" element={HomePageElement} />
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
          <Route exact path="/login" element={<Login />} />

          <Route path="/h/departure" element={<Departure />} />
          <Route exact path="/h/return" element={<Return />} />

          <Route exact path="/h/seating" element={<Seating />} />
          <Route exact path="/h/summary" element={<Summary />} />
          
          <Route
            exact
            path="/h/profile"
            element={<UserProfile />}
          />
          <Route
            exact
            path="/h/profile/reservations"
            element={<UserCancelFlight />}
          />
          <Route exact path="/h/profile/edit" element={<Editprofile />} />
          <Route exact path="/h/signup" element={<Signup />} />
          <Route exact path="/h/login" element={<ULogin />} />
          <Route exact path="/pay" element={<Pay />} />
          <Route exact path="/r" element={<CheckoutForm />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
