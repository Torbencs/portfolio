import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

//Sub components
import Project from "../components/Project";
import ProjectTemplate from "../components/ProjectTemplate";
//Css
import "../css/layout.sass";
import "../css/contact.sass";

const Contact = (props) => {
  const navArrow = useRef(null);

  useEffect(() => {
    props.currentPage("contact");

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
          <a href={""}>
            <img
              className={"contact__links"}
              src={process.env.PUBLIC_URL + "/images/github.png"}
              alt={"Link to Torbens github profile"}
            ></img>
          </a>
          <a href={""}>
            <img
              className={"contact__links"}
              src={process.env.PUBLIC_URL + "/images/email.png"}
              alt={"Link to Torbens email"}
            ></img>
          </a>
          <a href={""}>
            <img
              className={"contact__links"}
              src={process.env.PUBLIC_URL + "/images/linkedin.png"}
              alt={"Link to Torbens linkedIn profile"}
            ></img>
          </a>
        </article>
      </section>
    </div>
  );
};

export default Contact;
