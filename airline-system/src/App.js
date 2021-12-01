import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./search/app/index.js";

import AllFlight from "./Components/AllFlight";
import CreateFlight from "./Components/CreateFlight";
import UpdateFlight from "./Components/UpdateFlight";
import HomePage from "./Components/HomePage";
import AdminPanel from "./Components/AdminPanel";
<<<<<<< Updated upstream
=======
import ExisitingUserEdit from "./Components/ExisitingUserEdit";
import UCancelFlight from "./Components/UCancelFlight";
import UserHomeElement from "./Components/UserHome.js";
>>>>>>> Stashed changes

const HomePageElement = HomePage();
const AdminPanelElement = AdminPanel();
const AllFlightElement = AllFlight;
const CreateFlightElement = CreateFlight;
const UpdateFlightElement = UpdateFlight;
<<<<<<< Updated upstream
=======
const ExisitingUserEditElement = ExisitingUserEdit;
const UCancelFlightElement = UCancelFlight;
>>>>>>> Stashed changes

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
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
<<<<<<< Updated upstream
=======
                    <Route
            exact
            path="/home/eu/edit"
            element={<ExisitingUserEditElement />}
          />

<Route
            exact
            path="/home/u"
            element={<UserHomeElement />}
          />

<Route
            exact
            path="/home/cancelf"
            element={<UCancelFlightElement />}
          />
          
>>>>>>> Stashed changes
          {/* <Route exact path='/delete' element={DeleteFlightElement} /> */}
        </Routes>
      </Router>
    </div>
  );
}
export default App;
