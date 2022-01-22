import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

//Components
import Booking from "../porfolioComponents/booking/booking";
//Css
import "../css/layout.sass";
import "./project.sass";
import "../css/iphone.scss";

const Project = (props) => {
  const section = useRef();
  const header = useRef();
  const content = useRef();

  const [hoverState, setHoverState] = useState("null");

  useEffect(() => {
    // Add resize event handler to deal with padding of responsive element
    const handleResize = () => {};
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    let hidden = document.getElementsByClassName("sub__header");
    for (let i = 0; i < hidden.length; i++) {
      hidden[i].style.display = "none";
    }
    content.current.style.display = "inline-block";
    /* let hoverDiv = document.createElement("div");
    hoverDiv.classList.add("darken");
    article.current.appendChild(hoverDiv);
    hoverDiv.style.opacity = "100";
    setHoverState(hoverDiv); */
  };

  const handleExit = () => {
    let hidden = document.getElementsByClassName("sub__header");
    for (let i = 0; i < hidden.length; i++) {
      hidden[i].style.display = "inline-block";
    }
    content.current.style.display = "none";
  };

  return (
    <section ref={section} className={"sub__section"}>
      <header ref={header} className={"sub__header"} onClick={handleClick}>
        <h1>{props.title}</h1>
      </header>
      <article ref={content} className={"sub__article--fullScreen"}>
        <header className={"sub__article__header"}>
          <h1>Booking UI/UX</h1>
          <h2>
            The current booking experience for SME's does not optimize design
            flow or attempt to convert lost customers
          </h2>
          <div className={"sub__article__exit"} onClick={handleExit}></div>
        </header>
        <div className={"sub__article__content"}>
          <div className="iphonex">
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

          <div className={"sub__article__content--right"}>
            <div className={"sub__article__content__blurb"}>
              <p>Booking steps displayed in order of inflexibility.</p>
              <br></br>
              <p>
                The number of participants for a booking is usually
                predetermined and unchangeable. If this number is realised early
                the system can start to sort for potential booking conflicts and
                offer alternatives.
              </p>
            </div>
            <div className={"sub__article__content__blurb"}>
              Dynamic pricing ability to smooth out bookings during peak periods
              and boost off-peak sales
            </div>
            <div className={"sub__article__content__blurb"}>
              This is a blerb This is a blerb
            </div>
          </div>
          <div className={"--progress"}>// in development</div>
        </div>
      </article>
    </section>
  );
};

export default Project;
