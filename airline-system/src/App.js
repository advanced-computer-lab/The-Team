import './App.css';
import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Search from "./search/app/index.js"

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route exact path="/search" element={Search()}/>
        </Routes>
      </Router>
    </div>
  );

}
export default App;


