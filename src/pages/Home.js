import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/home.sass";

const Home = (props) => {
  useEffect(() => {
    props.currentPage("home");
  }, []);

  return (
    <nav className="homeMenu">
      <Link className="homeMenu__link" to="/about">
        about
      </Link>
      <Link className="homeMenu__link" to="/work">
        work
      </Link>
      <Link className="homeMenu__link" to="/contact">
        contact
      </Link>
      <Link className="homeMenu__link" to="/play">
        play
      </Link>
    </nav>
  );
};

export default Home;
