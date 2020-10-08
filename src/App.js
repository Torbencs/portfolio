import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";

//Pages
import Home from "./pages/Home";
import About from "./pages/About";

import "./css/fonts.css";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <Router>
      <div className={currentPage == "home" ? "wrapper" : "wrapper--left"}>
        <header>
          <h1>
            <Link to="/portfolio">
              torben<span className={"--yellow"}>.</span>
            </Link>
          </h1>
        </header>
        <main>
          <Switch>
            <Route
              exact
              path="/portfolio"
              render={(props) => (
                <Home {...props} currentPage={setCurrentPage} />
              )}
            />
            <Route
              exact
              path="/about"
              render={(props) => (
                <About {...props} currentPage={setCurrentPage} />
              )}
            />
            {/* <Route
              exact
              path="/work"
              render={(props) => (
                <Work {...props} currentPage={setCurrentPage} />
              )}
            />
            <Route
              exact
              path="/contact"
              render={(props) => (
                <Contact {...props} currentPage={setCurrentPage} />
              )}
            />
            <Route
              exact
              path="/play"
              render={(props) => (
                <Play {...props} currentPage={setCurrentPage} />
              )}
            /> */}
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
