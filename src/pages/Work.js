import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

//Sub components
import ProjectTemplate from "../components/ProjectTemplate";

//Css
import "../css/layout.sass";
import "../css/work.sass";

const Work = (props) => {
  const navArrow = useRef(null);

  useEffect(() => {
    props.currentPage("work");

    //Add onscroll eventhandler to check if navigation arrow needs to be displayed
    window.onscroll = function () {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        navArrow.current.style.display = "block";
      } else {
        navArrow.current.style.display = "none";
      }
    };
  }, []);

  const handleNavArrowClick = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(handleNavArrowClick);
      window.scrollTo(0, c - c / 8);
    }
  };

  return (
    <div>
      <nav ref={navArrow} className={"work__nav"} onClick={handleNavArrowClick}>
        <div className={"work__nav__arrow"}></div>
      </nav>
      <section className={"main__section"}>
        <article className={"main__article"}>
          <ProjectTemplate body={""} />
          <ProjectTemplate />
        </article>

        <div className={"--circle"}></div>
      </section>
    </div>
  );
};

export default Work;
