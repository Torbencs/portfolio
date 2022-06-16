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
import Demo from "./portfolioComponents/SayIt/pages/demo";

import "./css/fonts.css";
import "./App.sass";

function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 960px)" });

  //State for SayIt app demo. I am keeping it here instead of in it's own component to keep the git hub hash URL simple
  const [data, setData] = useState([
    {
      feedbackId: 1,
      topic: "Sales",
      body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum!`,
      status: "new",
    },
    {
      feedbackId: 2,
      topic: "Complaint",
      body: `Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
sapiente officiis modi at sunt excepturi expedita sint?`,
      status: "saved",
    },
    {
      feedbackId: 3,
      topic: "Customer Experience",
      body: `Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
totam ratione voluptas quod exercitationem fuga.`,
      status: "new",
    },
    {
      feedbackId: 4,
      topic: "Returns Policy",
      body: `Proin sem purus, accumsan id finibus et, elementum a est. Etiam vehicula convallis tempor. Nullam quis metus tempor, varius lorem quis, imperdiet metus. Vivamus a dui dolor.`,
      status: "new",
    },
    {
      feedbackId: 5,
      topic: "Other",
      body: `Sed ultrices erat orci, a porttitor leo convallis vel. Sed pharetra augue at condimentum lacinia. In consequat magna non sodales bibendum. Donec rhoncus tellus a laoreet ornare.`,
      status: "new",
    },
    {
      feedbackId: 6,
      topic: "Returns Policy",
      body: `Suspendisse egestas tellus odio, a sagittis nunc condimentum ac.`,
      status: "new",
    },
  ]);
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
            //SayIt Demo Routes
            <Route
              path="/sayit"
              render={(props) => (
                <Home setData={setData} data={data} {...props} />
              )}
            />
            <Route
              path="/submit"
              render={(props) => (
                <Submit data={data} setData={setData} {...props} />
              )}
            />
            <Route
              path="/demo"
              render={(props) => <Demo data={data} {...props} />}
            />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
