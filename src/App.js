import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

//Pages
import Home from "./pages/Home";

import "./css/fonts.css";
import "./css/home.sass";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/book" component={"Book"} />
        <Route path="/booked" component={"Booked"} />
      </Switch>
    </Router>
  );
}

export default App;
