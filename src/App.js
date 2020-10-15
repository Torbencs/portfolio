import React, { useState, useEffect } from "react";
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
import Work from "./pages/Work";

import Play from "./pages/Play";

import "./css/fonts.css";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <Router>
      <div id={"pointerLockDiv"}>
        <div id="appWrapper">
          <div
            id={"navWrapper"}
            className={
              currentPage == "home" || currentPage == "play"
                ? "wrapper"
                : "wrapper--left"
            }
          >
            <header>
              <h1>
                <Link to="/portfolio">
                  torben<span className={"--yellow"}>.</span>
                </Link>
              </h1>
              <nav
                className={
                  currentPage == "home" || currentPage == "play"
                    ? "homeMenu"
                    : "homeMenu--left"
                }
              >
                <Link className="homeMenu__link" to="/about">
                  about
                </Link>
                <Link className="homeMenu__link" to="/work">
                  work
                </Link>
                <Link className="homeMenu__link" to="/contact">
                  contact
                </Link>
                <Link
                  className="homeMenu__link"
                  to="/play"
                  onClick={() => {
                    const pointerLockDiv = document.getElementById(
                      "pointerLockDiv"
                    );
                    pointerLockDiv.requestPointerLock =
                      pointerLockDiv.requestPointerLock ||
                      pointerLockDiv.mozRequestPointerLock;

                    pointerLockDiv.requestPointerLock();
                  }}
                >
                  play
                </Link>
              </nav>
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
                <Route
                  exact
                  path="/work"
                  render={(props) => (
                    <Work {...props} currentPage={setCurrentPage} />
                  )}
                />
                {/* <Route
              exact
              path="/contact"
              render={(props) => (
                <Contact {...props} currentPage={setCurrentPage} />
              )}
            /> */}
                <Route
                  exact
                  path="/play"
                  render={(props) => (
                    <Play {...props} currentPage={setCurrentPage} />
                  )}
                />
              </Switch>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
