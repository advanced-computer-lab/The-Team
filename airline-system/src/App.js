import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom';


import DeleteFlight from './Components/DeleteFlight';
import CreateFlight from './Components/CreateFlight';


const DeleteFlightElement = DeleteFlight();
const CreateFlightElement = CreateFlight;
function App() {
  return (
    <div className="App">


      <Router>
        <Routes>
      <Route exact path='/delete' element={DeleteFlightElement} />
      <Route exact path='/create' element={<CreateFlightElement/>} />

      </Routes>
      </Router>



    </div>
  );
}

export default App;
