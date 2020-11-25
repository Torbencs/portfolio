import React, { useState, useEffect, useRef } from "react";
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
import Contact from "./pages/Contact";

import Play from "./pages/Play";

import "./css/fonts.css";
import "./App.css";

function App() {
  //The page the user is currently on
  const [currentPage, setCurrentPage] = useState("home");
  //The current or most recent hover target (used to move the yellow dot in the nav)
  const [currentHover, setCurrentHover] = useState("home");
  //The current position of the yellow dot. Saved in state so it can be used as starting point for play ball
  const [yellowDot, setYellowDot] = useState({ el: null, x: 0, y: 0 });

  //Save reference to the yellow dot span tag
  const refYellowDot = useRef(null);

  /* Yellow navigation dot move effect
  //
  */
  useEffect(() => {
    // - Save the current hovered element to the 'currentHoverEl' variable
    let currentHoverEl = document.getElementById(`${currentHover}`);

    // - Change the line height of the yellow dot span tag if it is not over the home header. Keeps the dot aligned with the different font sizes
    currentHover == "home"
      ? (refYellowDot.current.style.lineHeight = "1.05em")
      : (refYellowDot.current.style.lineHeight = "0.15em");

    // - Set yellow dot's top distance equal to the current hover target with absolute position helper function
    refYellowDot.current.style.top =
      currentHoverEl.getBoundingClientRect().top + "px";

    // - Save yellow dot position to state to pass as prop to Play page and use for the play ball starting position
    setYellowDot({
      el: refYellowDot.current,
      x: refYellowDot.current.getBoundingClientRect().left,
      y: currentHoverEl.getBoundingClientRect().top,
    });

    // - Re-run every time 'currentHover' changes
  }, [currentHover]);

  /* Render
  //
  */
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
            <header
              className={
                currentPage == "home" || currentPage == "play"
                  ? "main__header"
                  : "main__header--left"
              }
            >
              <nav
                className={
                  currentPage == "home" || currentPage == "play"
                    ? "homeMenu"
                    : "homeMenu--left"
                }
              >
                <h1>
                  <Link
                    id={"home"}
                    to="/portfolio"
                    onMouseEnter={() => {
                      currentPage == "home"
                        ? setCurrentHover("home")
                        : setCurrentHover(currentPage);
                    }}
                    onClick={() => {
                      setCurrentHover("home");
                    }}
                  >
                    torben
                    <span
                      id={
                        currentPage == "home" || currentPage == "play"
                          ? "nav__yellow-dot"
                          : "nav__yellow-dot--left"
                      }
                      ref={refYellowDot}
                    >
                      .
                    </span>
                  </Link>
                </h1>

                <Link
                  id={"about"}
                  className="homeMenu__link"
                  to="/about"
                  onMouseEnter={() => {
                    setCurrentHover("about");
                  }}
                  onMouseLeave={() => {
                    currentPage == "home"
                      ? setCurrentHover("home")
                      : setCurrentHover(currentPage);
                  }}
                >
                  about
                </Link>
                <Link
                  id={"work"}
                  className="homeMenu__link"
                  to="/work"
                  onMouseEnter={() => {
                    setCurrentHover("work");
                  }}
                  onMouseLeave={() => {
                    currentPage == "home"
                      ? setCurrentHover("home")
                      : setCurrentHover(currentPage);
                  }}
                >
                  work
                </Link>
                <Link
                  id={"contact"}
                  className="homeMenu__link"
                  to="/contact"
                  onMouseEnter={() => {
                    setCurrentHover("contact");
                  }}
                  onMouseLeave={() => {
                    currentPage == "home"
                      ? setCurrentHover("home")
                      : setCurrentHover(currentPage);
                  }}
                >
                  contact
                </Link>
                <Link
                  id={"play"}
                  className="homeMenu__link"
                  to="/play"
                  onMouseEnter={() => {
                    setCurrentHover("play");
                  }}
                  onClick={() => {
                    const pointerLockDiv = document.getElementById(
                      "pointerLockDiv"
                    );
                    pointerLockDiv.requestPointerLock =
                      pointerLockDiv.requestPointerLock ||
                      pointerLockDiv.mozRequestPointerLock;

                    pointerLockDiv.requestPointerLock();
                  }}
                  onMouseLeave={() => {
                    currentPage == "home"
                      ? setCurrentHover("home")
                      : setCurrentHover(currentPage);
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
                    <Play
                      {...props}
                      currentPage={setCurrentPage}
                      yellowDot={yellowDot}
                    />
                  )}
                />
              </Switch>
            </main>
          </div>
          <div id={"circle"}>
            <div id={"circle--outline"}></div>
          </div>
          <div id={"square"}>
            <div id={"square--outline"}></div>
          </div>
          <div id={"triangle"}>
            <div id={"triangle--outline"}></div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
