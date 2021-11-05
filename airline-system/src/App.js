import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom';


import DeleteFlight from './Components/DeleteFlight';

const DeleteFlightElement = DeleteFlight();
function App() {
  return (
    <div className="App">


      <Router>
        <Routes>
      <Route
     exact path='/remove' element={DeleteFlightElement} />
      </Routes>
      </Router>



    </div>
  );
}

export default App;
