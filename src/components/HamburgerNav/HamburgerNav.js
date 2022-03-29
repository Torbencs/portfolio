import React, { useEffect, useState } from "react";

import {
  Route,
  BrowserRouter as Router,
  NavLink,
  useLocation,
} from "react-router-dom";
import { animate } from "motion";

import "../../css/fonts.css";
import "./HamburgerNav.sass";

function HamburgerNav() {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const location = useLocation();

  //Animate opacity fade-in of the menu when it loads or swaps to smaller screen size
  useEffect(() => {
    animate(".hamburger__container", { opacity: 1 }, { duration: 0.8 });
  }, []);

  //When visitor changes page hide the menu and change menu icon from cross to hamburger
  useEffect(() => {
    setShowMenu(false);
    document.getElementById("check").checked = false;
  }, [location]);

  const Menu = () => {
    if (!showSubMenu) {
      return (
        <>
          <NavLink id={"about"} to="/about">
            about
          </NavLink>

          <a onClick={() => setShowSubMenu(true)}>work</a>

          <NavLink id={"play"} to="/play">
            play
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink
            id={"design"}
            className="sideMenu__link slideInUp"
            to="/graphic"
          >
            graphic
          </NavLink>
          <a className="hidden" style={{ cursor: "default" }}>
            .
          </a>
          <NavLink id={"web"} className="sideMenu__link slideInDown" to="/web">
            web
          </NavLink>
        </>
      );
    }
  };

  return (
    <nav
      className={`hamburger__container ${
        showMenu && "hamburger__container--wide"
      }`}
    >
      <label className="hamburger__label" htmlFor="check">
        <input
          type="checkbox"
          id="check"
          onClick={() => {
            animate(".hamburger__list", { opacity: [0, 1] }, { duration: 1 });
            setShowMenu((showMenu) => setShowMenu(!showMenu));
            setShowSubMenu(false);
          }}
        />
        <div className="hamburger__div--1"></div>
        <div className="hamburger__div--2"></div>
        <div className="hamburger__div--3"></div>
      </label>
      <div className="hamburger__list">{showMenu && <Menu />}</div>
      <div
        className={`hamburger__triangle ${
          showMenu && "hamburger__triangle--wide"
        }`}
      ></div>
    </nav>
  );
}

export default HamburgerNav;
