import React, { useEffect } from "react";
import { animate, spring } from "motion";
//Css
import "./Gallery.sass";

const Gallery = (props) => {
  useEffect(() => {
    animate(
      ".work__container--gallery",
      { scale: [0, 1], opacity: 1 },
      { duration: 0.3, easing: [0.37, 1.09, 0.71, 1] }
    );
  });
  return (
    <section
      className={"work__container--gallery"}
      style={{ backgroundColor: props.bgColor }}
    >
      <aside className="work__gallery">
        <img
          src={`${process.env.PUBLIC_URL}/images/design/${props.imgSrc}`}
          className="gallery__img"
        />
      </aside>
      <article className="work__article">
        <h1
          className={`gallery__h1 ${
            props.textTheme == "light"
              ? "gallery__h1--light"
              : "gallery__h1--dark"
          }`}
        >
          {props.title}
          <span className={"--yellow"}>.</span>
        </h1>
        <p
          className={`gallery__p ${
            props.textTheme == "light"
              ? "gallery__p--light"
              : "gallery__p--dark"
          }`}
        >
          {props.text}
        </p>
        {props.altImg && (
          <img
            className="gallery__img--alt"
            src={`${process.env.PUBLIC_URL}/images/design/${props.altImg}`}
          />
        )}

        <div className="gallery__triangle">
          <div
            className="gallery__close"
            onClick={() => props.history.push("/graphic")}
          ></div>
        </div>
      </article>
    </section>
  );
};

export default Gallery;