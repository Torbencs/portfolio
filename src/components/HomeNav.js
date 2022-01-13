import React, { useEffect } from "react";

import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import { animate } from "motion";

import "../css/fonts.css";
import "./HomeNav.sass";

function HomeNav() {
  /* Yellow navigation dot move effect
  //
  */
  useEffect(() => {
    //Set inital yellow dot fixed position
    document.getElementById("nav__yellow-dot").style.top =
      document.getElementById("home").getBoundingClientRect().bottom -
      20 +
      "px";
  }, []);

  const handleDot = (event) => {
    let element = event.target.getBoundingClientRect();
    let middle = element.top + (element.bottom - element.top) / 2 - 8; //8 = circle size
    //Change yellow dot position to absolute

    animate(`#nav__yellow-dot`, {
      top: middle + "px",
    });
    //document.getElementById("nav__yellow-dot").style.position = "fixed";
  };

  const handleDotLeave = () => {
    animate(`#nav__yellow-dot`, {
      top:
        document.getElementById("home").getBoundingClientRect().bottom -
        43 +
        "px",
    });
  };

  /* Render
  //
  */
  return (
    <header className={"main__header"}>
      <nav className={"homeMenu"}>
        <h1>
          <a id={"home"}>Torben</a>
          <div id={"nav__yellow-dot"}></div>
        </h1>

        <Link
          id={"about"}
          className="homeMenu__link"
          to="/about"
          onMouseEnter={handleDot}
          onMouseLeave={handleDotLeave}
        >
          about
        </Link>
        <Link
          id={"work"}
          onMouseEnter={handleDot}
          onMouseLeave={handleDotLeave}
          className="homeMenu__link"
          to="/work"
        >
          work
        </Link>

        <Link
          id={"play"}
          onMouseEnter={handleDot}
          onMouseLeave={handleDotLeave}
          className="homeMenu__link--yellow"
          to="/play"
        >
          play
        </Link>
      </nav>
    </header>
  );
}

export default HomeNav;
