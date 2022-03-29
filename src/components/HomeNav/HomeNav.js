import React, { useEffect, useState } from "react";
import { CSSTransitionGroup } from "react-transition-group";

import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import { animate } from "motion";

import Typist from "react-typist";

import "../../css/fonts.css";
import "./HomeNav.sass";

function HomeNav() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  setTimeout(() => {
    setShowMenu(true);
  }, 3400);

  const Torben = () => {
    return (
      <h1>
        <a id={"home"}>
          <Typist avgTypingDelay={150} cursor={{ show: false }}>
            Torben
            <Typist.Delay ms={1000} />
            <span className="dot--yellow">.</span>
          </Typist>
        </a>
      </h1>
    );
  };

  const NavLinks = () => {
    const SubMenu = () => {
      return (
        <>
          <Link
            id={"design"}
            className="homeMenu__link--option slideInUp"
            to="/graphic"
          >
            <span className="highlight--yellow">graphic</span>
          </Link>
          <div className="homeMenu__link--option hidden">.</div>
          <Link
            id={"web"}
            className="homeMenu__link--option slideInDown"
            to="/web"
          >
            <span className="highlight--yellow">web</span>
          </Link>
        </>
      );
    };
    const Menu = () => {
      return (
        <CSSTransitionGroup
          transitionName="fadeIn"
          transitionAppear={true}
          transitionAppearTimeout={900}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Link id={"about"} className="homeMenu__link" to="/about">
            about<span className="homeMenu__link--yellow">.</span>
          </Link>
          <a className="homeMenu__link" onClick={() => setShowSubMenu(true)}>
            work<span className="homeMenu__link--yellow">.</span>
          </a>
          <Link id={"play"} className="homeMenu__link " to="/play">
            play<span className="homeMenu__link--yellow">.</span>
          </Link>
        </CSSTransitionGroup>
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
        {showMenu ? <NavLinks /> : <Torben />}
      </nav>
    </header>
  );
}

export default HomeNav;
