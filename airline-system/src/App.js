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
import Departure from "./Components/Departure"
import Return from "./Components/Return"
import Seating from "./Components/Seating"
import Login from "./login";
import UserCancelFlight from "./cancel/UserCancelFlight"

const HomePageElement = HomePage();
const AdminPanelElement = AdminPanel();
const AllFlightElement = AllFlight;
const CreateFlightElement = CreateFlight;
const UpdateFlightElement = UpdateFlight;
const EditprofileElement  =  Editprofile;

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
          <Route exact path="/users/update" element={<Editprofile />} />
          <Route path="/h/departure" element={<Departure />} />
          <Route exact path="/h/return" element={<Return />} />
          <Route exact path="/h/seating" element={<Seating />} />
          <Route exact path="/h/cancel" element={<UserCancelFlight />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
