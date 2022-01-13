import React, { useEffect } from "react";

import { Route, BrowserRouter as Router, NavLink } from "react-router-dom";
import { animate } from "motion";

import "../css/fonts.css";
import "./SideNav.sass";

function SideNav() {
  useEffect(() => {
    animate("#side__header", { opacity: 1, x: [-200, 0] }, { duration: 0.8 });
  }, []);
  return (
    <header id={"side__header"}>
      <nav className={"sideMenu"}>
        <NavLink
          id={"about"}
          className="sideMenu__link"
          activeClassName="sideMenu__link--active"
          to="/about"
        >
          about
        </NavLink>
        <NavLink
          id={"work"}
          className="sideMenu__link"
          activeClassName="sideMenu__link--active"
          to="/work"
        >
          work
        </NavLink>

        <NavLink
          id={"play"}
          className="sideMenu__link"
          activeClassName="sideMenu__link--active"
          to="/play"
        >
          play
        </NavLink>
      </nav>
    </header>
  );
}

export default SideNav;
