import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/home.sass";

const Home = (props) => {
  useEffect(() => {
    props.currentPage("home");
    props.currentHover("home");

    ////Move UI elements
    let circle = document.getElementById("circle");
    circle.style.bottom = 7 + "em";
    circle.style.right = 34 + "em";
    //-- Square
    let square = document.getElementById("square");
    square.style.top = 10 + "em";
    square.style.right = 36 + "em";
    //-- Triangle
    let triangle = document.getElementById("triangle");
    triangle.style.bottom = 21 + "em";
    triangle.style.left = 36 + "em";
    triangle.style.top = "";
  }, []);

  return null;
};

export default Home;
