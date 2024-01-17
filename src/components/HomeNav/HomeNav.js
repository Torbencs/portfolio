import React, { useEffect, useState } from "react";

import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import { animate } from "motion";

import "../../css/fonts.css";
import "./HomeNav.sass";

function HomeNav() {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const NavLinks = () => {
    const SubMenu = () => {
      return (
        <>
          <Link
            id={"web"}
            className="homeMenu__link--option slideInUp"
            to="/web"
          >
            <span className="highlight--yellow">web</span>
          </Link>
          <div className="homeMenu__link--option hidden">.</div>

          <Link
            id={"design"}
            className="homeMenu__link--option slideInDown "
            to="/graphic"
          >
            <span className="highlight--yellow">graphic</span>
          </Link>
        </>
      );
    };
    const Menu = () => {
      return (
        <>
          <Link id={"about"} className="homeMenu__link" to="/about">
            about<span className="homeMenu__link--yellow">.</span>
          </Link>
          <a className="homeMenu__link" onClick={() => setShowSubMenu(true)}>
            work<span className="homeMenu__link--yellow">.</span>
          </a>
          <Link id={"play"} className="homeMenu__link " to="/play">
            play<span className="homeMenu__link--yellow">.</span>
          </Link>
        </>
      );
    };

    return showSubMenu ? <SubMenu /> : <Menu />;
  };
  /* Render
  //
  */
  return (
    <header className={"main__header"}>
      <nav className={"homeMenu"} onMouseLeave={() => setShowSubMenu(false)}>
        <NavLinks />
      </nav>
    </header>
  );
}

export default HomeNav;
