import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//Css
import "./WebGallery.sass";

const WebGallery = (props) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const scroll = () => !props.isApp && setIsActive(true);
    window.addEventListener("wheel", scroll);

    return () => window.removeEventListener("wheel", scroll);
  }, []);

  return (
    <section
      className={"web__container--gallery"}
      style={{ backgroundColor: props.bgColor }}
    >
      <div className="webgallery__header">
        <h1 className="webgallery__h1">
          {props.title}
          <span className="--yellow">.</span>
        </h1>
      </div>
      <p className="webgallery__p">{props.text}</p>

      <div
        className={`web__webgallery ${isActive && "web__webgallery--active"} ${
          props.isApp && "web__webgallery--app"
        }`}
        onClick={() => !props.isApp && setIsActive(true)}
      >
        {props.images
          ? props.images.map((image, index) => (
              <img
                key={index}
                src={`${process.env.PUBLIC_URL}/images/${image}`}
                onClick={() =>
                  props.link && window.open(`https://torbens.me${props.link}`)
                }
              />
            ))
          : props.component}
      </div>

      <div className="webgallery__triangle">
        <div
          className="webgallery__close"
          onClick={() => props.history.push("/web")}
        ></div>
      </div>
    </section>
  );
};

export default WebGallery;
