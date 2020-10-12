import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/home.sass";

const Home = (props) => {
  useEffect(() => {
    props.currentPage("home");
  }, []);

  return null;
};

export default Home;
