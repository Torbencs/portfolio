import React, { useState, useEffect, useLayoutEffect } from "react";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

//Pages
import About from "./pages/About/About";
import Ski from "./components/Ski";
import Score from "./components/Score";
import Design from "./pages/Design/Design";
import Web from "./pages/Web/Web";
//import URL from "./pages/URL";

//Components
import HomeNav from "./components/HomeNav";
import SideNav from "./components/SideNav";

import "./css/fonts.css";
import "./App.sass";

function App() {
  /* Render
  //
  */
  return (
    <Router>
      <Route
        exact
        path="/portfolio"
        render={(props) => <HomeNav {...props} />}
      />
      <div className={"flex-container"}>
        <Route exact path={["/about", "/design", "/web", "/play", "/score"]}>
          <SideNav />
        </Route>

        <main>
          <Switch>
            <Route
              exact
              path="/about"
              render={(props) => <About {...props} />}
            />

            <Route path="/design" render={(props) => <Design {...props} />} />
            <Route path="/web" render={(props) => <Web {...props} />} />
            <Route exact path="/play">
              <Ski />
            </Route>
            <Route
              exact
              path="/score"
              render={(props) => <Score {...props} />}
            />
            {/* <Route path="/url" render={(props) => <URL />} /> */}
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
