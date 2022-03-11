import React, { useEffect, useState } from "react";
import { CSSTransitionGroup } from "react-transition-group";

import { Route, BrowserRouter as Router, NavLink } from "react-router-dom";
import { animate } from "motion";

import "../css/fonts.css";
import "./SideNav.sass";

function SideNav() {
  const [showSubMenu, setShowSubMenu] = useState(false);
  useEffect(() => {
    animate("#side__header", { opacity: 1, x: [-200, 0] }, { duration: 0.8 });
  }, []);

  const Menu = () => (
    <>
      <NavLink
        id={"about"}
        className="sideMenu__link fadeIn"
        activeClassName="sideMenu__link--active"
        to="/about"
      >
        about
      </NavLink>

      <a className="sideMenu__link fadeIn" onClick={() => setShowSubMenu(true)}>
        work
      </a>

      <NavLink
        id={"play"}
        className="sideMenu__link fadeIn"
        activeClassName="sideMenu__link--active"
        to="/play"
      >
        play
      </NavLink>
    </>
  );
  const SubMenu = () => (
    <>
      <NavLink id={"design"} className="sideMenu__link slideInUp" to="/graphic">
        graphic
      </NavLink>
      <a className="sideMenu__link hidden" style={{ cursor: "default" }}>
        .
      </a>
      <NavLink id={"web"} className="sideMenu__link slideInDown" to="/web">
        web
      </NavLink>
    </>
  );

  return (
    <header id={"side__header"} onMouseLeave={() => setShowSubMenu(false)}>
      <nav className={"sideMenu fadeIn"}>
        {showSubMenu ? <SubMenu /> : <Menu />}{" "}
      </nav>
    </header>
  );
}

export default SideNav;
