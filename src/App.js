import React, { useState } from "react";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

//Responsive
import { useMediaQuery } from "react-responsive";

//Pages
import About from "./pages/About/About";
import Play from "./pages/Play/Play";
import Design from "./pages/Design/Design";
import Web from "./pages/Web/Web";
import Tetris from "./pages/Tetris";

//Components
import HomeNav from "./components/HomeNav/HomeNav";
import SideNav from "./components/SideNav/SideNav";
import HamburgerNav from "./components/HamburgerNav/HamburgerNav";
import Score from "./pages/Play/Score";

//Apps
import Home from "./components/SayIt/pages/home";

import "./css/fonts.css";
import "./App.sass";

function App() {
  //Store the score from  the play component here to pass down to score component. This should really be managed inside the play component
  const [score, setScore] = useState(3);
  const isMobile = useMediaQuery({ query: "(max-width: 960px)" });
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
        <Route exact path={["/about", "/graphic", "/web", "/score"]}>
          {isMobile ? <HamburgerNav /> : <SideNav />}
        </Route>
        <Route exact path={"/play"}>
          {/* {isMobile ? <ScoreMobile /> : <Score />} */}
          <Score score={score} />
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
            <Route path="/sayit" render={(props) => <Home {...props} />} />
            <Route exact path="/play">
              <Play handleScore={setScore} score={score} />
            </Route>
            <Route
              exact
              path="/score"
              render={(props) => <Score {...props} />}
            />
            <Route path="/tetris" render={(props) => <Tetris />} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
