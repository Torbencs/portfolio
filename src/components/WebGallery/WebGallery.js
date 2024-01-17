import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//Css
import "./WebGallery.sass";

const WebGallery = (props) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const scroll = () => !props.isApp && !props.video && setIsActive(true);
    window.addEventListener("wheel", scroll);

    return () => window.removeEventListener("wheel", scroll);
  }, []);

  const Images = () => {
    //If there are multiple links then apply css class to use the images as thumbnails
    if (props.link.length > 1) {
      return props.images.map((image, index) => (
        <img
          key={index}
          src={`${process.env.PUBLIC_URL}/images/${image}`}
          className="webGallery__images"
          onClick={() =>
            props.link &&
            window.open(
              `https://torbencs.github.io/portfolio/#${props.link[index]}`
            )
          }
        />
      ));
    } else if (props.images) {
      //Else if there are images but one or no links then use large image
      return props.images.map((image, index) => (
        <img
          key={index}
          src={`${process.env.PUBLIC_URL}/images/${image}`}
          onClick={() =>
            props.link &&
            window.open(
              `https://torbencs.github.io/portfolio/#${props.link[0]}`
            )
          }
        />
      ));
    } else if (props.component) {
      //No images then render the component
      return props.component;
    } else if (props.video) {
      return (
        <video
          src={`${process.env.PUBLIC_URL}/videos/${props.video}`}
          width={"100%"}
          controls
        />
      );
    }
  };

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
        <Images />
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
