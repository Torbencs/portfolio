import React, { useEffect, useState } from "react";
import { CSSTransitionGroup } from "react-transition-group";

import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import { animate } from "motion";

import "../css/fonts.css";
import "./HomeNav.sass";

function HomeNav() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  setTimeout(() => {
    setShowMenu(true);
  }, 3000);

  const Torben = () => {
    return (
      <h1>
        <a
          id={"home"}
          onMouseOver={() => {
            setTimeout(() => {
              setShowMenu(true);
            }, 800);
          }}
        >
          Torben<span className="dot--yellow">.</span>
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
            to="/design"
          >
            <span className="highlight--yellow">design</span>
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
            <span className="highlight--yellow">about</span>
          </Link>
          <a className="homeMenu__link" onClick={() => setShowSubMenu(true)}>
            <span className="highlight--yellow">work</span>
          </a>
          <Link id={"play"} className="homeMenu__link " to="/play">
            <span className="highlight--yellow">play</span>
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