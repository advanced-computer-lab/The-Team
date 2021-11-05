import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./component/Header";
import Signin from "./pages/SignIn";
import HomeAdmin from "./component/admin/index";
import Protected from "./component/private/Protected";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Protected />
        <Switch>
          <Route path="/signin" component={Signin} exact />
          <Route path="/admin" component={HomeAdmin} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
