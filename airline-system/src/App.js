import './App.css';
import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Search from "./search/app/index.js"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom';


import AllFlight from './Components/AllFlight';
import CreateFlight from './Components/CreateFlight';
import UpdateFlight from './Components/UpdateFlight';
import HomePage from './Components/HomePage';
import AdminPanel from './Components/AdminPanel';


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
      <Route exact path='/home' element={HomePageElement} />
      <Route exact path='/home/adminpanel' element={AdminPanelElement} />
      <Route exact path="/home/adminpanel/search" element={Search()}/>
      <Route exact path='/home/adminpanel/flights' element={<AllFlightElement/>} />  
      <Route exact path='/home/adminpanel/create' element={<CreateFlightElement/>} />
      <Route exact path='/home/adminpanel/flights/update' element={<UpdateFlightElement/>} />
      {/* <Route exact path='/delete' element={DeleteFlightElement} /> */}
      </Routes>
      </Router>
    </div>
  );

}
export default App;


