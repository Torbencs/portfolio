import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

//Components
import Booking from "../porfolioComponents/booking/booking";
//Css
import "../css/layout.sass";
import "./ProjectTemplate.sass";
import "../css/iphone.scss";

const ProjectTemplate = (props) => {
  const section = useRef();
  const header = useRef();
  const article = useRef();

  const [hoverState, setHoverState] = useState("null");

  useEffect(() => {
    // Add resize event handler to deal with padding of responsive element
    const handleResize = () => {
      article.current.style.paddingTop =
        header.current.getBoundingClientRect().height + "px";

      article.current.style.paddingTop =
        header.current.getBoundingClientRect().height + "px";
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleHoverIn = () => {
    /* let hoverDiv = document.createElement("div");
    hoverDiv.classList.add("darken");
    article.current.appendChild(hoverDiv);
    hoverDiv.style.opacity = "100";
    setHoverState(hoverDiv); */
    article.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
    console.log("scroll");

    header.current.classList.add("header--hover");
  };

  const handleHoverOut = () => {
    if (hoverState) {
      hoverState.classList.add("lighten");
      header.current.classList.remove("header--hover");
      setTimeout(() => {
        hoverState.remove();
      }, 500);
    }
  };

  return (
    <section ref={section} className={"sub__section"}>
      <header ref={header} className={"sub__header"}>
        <h1>Booking UI/UX</h1>
        <h2>
          {" "}
          Booking pages have too much friction and do not optimize design flow
        </h2>
      </header>
      <article ref={article} className={"sub__article"}>
        <div
          className="iphonex"
          onMouseEnter={handleHoverIn}
          onMouseLeave={handleHoverOut}
        >
          <div className="front">
            <div className="screen">
              <div className="screen__view">
                <Booking />
              </div>

              <div className={"screen__front"}>
                <div className={"screen__front-speaker"}></div>
                <div className={"screen__front-camera"}></div>
              </div>
            </div>
            <div className={"front__line"}></div>
            <div className={"front__line front__line-second"}></div>
          </div>
          <div className={"phoneButtons phoneButtons-right"}></div>
          <div className={"phoneButtons phoneButtons-left"}></div>
          <div className={"phoneButtons phoneButtons-left2"}></div>
          <div className={"phoneButtons phoneButtons-left3"}></div>

          <div className={"back"}></div>
        </div>

        <div className={"sub__article__blurb"}></div>
      </article>
    </section>
  );
};

export default ProjectTemplate;
