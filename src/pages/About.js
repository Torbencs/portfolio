import React, { useEffect } from "react";
import { Link } from "react-router-dom";

//Css
import "../css/article.sass";

const About = (props) => {
  useEffect(() => {
    props.currentPage("about");
  }, []);

  return (
    <div>
      <nav className="homeMenu--left">
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

      <div className={"about__article--circle"}>
        <article className={"about__article"}></article>
      </div>
    </div>
  );
};

export default About;
