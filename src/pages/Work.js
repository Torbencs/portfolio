import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

//Sub components
import Project from "../components/Project";
import ProjectTemplate from "../components/ProjectTemplate";
//Css
import "../css/layout.sass";
import "../css/work.sass";

const Work = (props) => {
  const navArrow = useRef(null);

  useEffect(() => {
    props.currentPage("work");

    //Add onscroll eventhandler to check if navigation arrow needs to be displayed
    const scrollHandler = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        navArrow.current.style.display = "block";
      } else {
        navArrow.current.style.display = "none";
      }
    };

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
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
          <Project title={"Booking UI/UX"} />
          <Project title={"Inspection Reporting UI/UX"} />
          <Project body={""} />
          <Project body={""} />
          <Project title={"Booking UI/UX"} />
        </article>
      </section>
      <div className={"--circle"}></div>
    </div>
  );
};

export default Work;
