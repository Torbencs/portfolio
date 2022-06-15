import React, { useState } from "react";

import { Route, HashRouter as Router, Switch } from "react-router-dom";

//Responsive
import { useMediaQuery } from "react-responsive";

//Pages
import About from "./pages/About/About";
import Play from "./pages/Play/Play";
import Design from "./pages/Design/Design";
import Web from "./pages/Web/Web";

//Components
import HomeNav from "./components/HomeNav/HomeNav";
import SideNav from "./components/SideNav/SideNav";
import HamburgerNav from "./components/HamburgerNav/HamburgerNav";

//Apps
import Home from "./portfolioComponents/SayIt/pages/home";
import Submit from "./portfolioComponents/SayIt/pages/submit";

import "./css/fonts.css";
import "./App.sass";

function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 960px)" });

  /* Render
  //
  */
  return (
    <Router basename="/">
      <Route exact path="/" render={(props) => <HomeNav {...props} />} />
      <div className={"flex-container"}>
        <Route exact path={["/about", "/graphic", "/web", "/score"]}>
          {isMobile ? <HamburgerNav /> : <SideNav />}
        </Route>

        <main>
          <Switch>
            <Route
              exact
              path="/about"
              render={(props) => <About {...props} />}
            />
            <Route path="/graphic" render={(props) => <Design {...props} />} />
            <Route path="/web" render={(props) => <Web {...props} />} />
            <Route path="/play" render={(props) => <Play {...props} />} />
            <Route path="/sayit" render={(props) => <Home {...props} />} />
            <Route path="/submit" render={(props) => <Submit {...props} />} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
