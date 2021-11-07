import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom';


import DeleteFlight from './Components/DeleteFlight';
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
//const DeleteFlightElement = DeleteFlight();

// AllFlight = (index , e) =>{
//   const AllFlight = Object.assign([], this.state.AllFlight);
//   AllFlight.splice(index, 1);
//   this.setState({AllFlight:AllFlight});
  
// }


function App() {
  return (
    <div className="App">


      <Router>
        <Routes>
      <Route exact path='/home' element={HomePageElement} />
      <Route exact path='/home/adminpanel' element={AdminPanelElement} />
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
