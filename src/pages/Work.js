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

    //
    // http://easings.net/#easeInOutQuart
    //  t: current time
    //  b: beginning value
    //  c: change in value
    //  d: duration
    //
    function easeInOutQuart(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
      return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
    }

    //Move UI elements to edge of page to make room for content
    //-- Circle
    let circle = document.getElementById("circle");
    circle.style.bottom = 8 + "%";
    circle.style.right = 8 + "%";
    //-- Square
    let square = document.getElementById("square");
    square.style.top = 15 + "%";
    square.style.right = 5 + "%";
    //-- Triangle
    let triangle = document.getElementById("triangle");
    triangle.style.bottom = 13 + "%";
    triangle.style.left = 6 + "%";

    const UIparallax = (e) => {
      /* triangle.style.top = triangle.offsetTop + e.movementY * 0.05 + "px";
      triangle.style.left = triangle.offsetLeft + e.movementX * 0.03 + "px";

      square.style.top = square.offsetTop + e.movementY * 0.05 + "px";
      square.style.left = square.offsetLeft + e.movementX * 0.03 + "px";

      circle.style.top = circle.offsetTop + e.movementY * 0.05 + "px";
      circle.style.left = circle.offsetLeft + e.movementX * 0.03 + "px"; */
    };
    window.addEventListener("mousemove", UIparallax);

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
    </div>
  );
};

export default Work;
