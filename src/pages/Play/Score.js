import React, { useEffect, useState } from "react";

import { Route, BrowserRouter as Router, NavLink } from "react-router-dom";
import { animate } from "motion";

import "../../css/fonts.css";
import "./Score.sass";

function Score({ score }) {
  useEffect(() => {
    animate("#score__header", { opacity: 1, x: [-200, 0] }, { duration: 0.8 });
  }, []);

  return (
    <header id={"score__header"}>
      <nav className="score__nav">
        <h1 className="score__title">Par</h1>
        <h2 className="score__number">{score}</h2>
      </nav>
    </header>
  );
}

export default Score;
