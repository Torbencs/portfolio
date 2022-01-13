import React, { useEffect } from "react";
//Css
import "./Gallery.sass";

const Gallery = (props) => {
  return (
    <section
      className={"work__container--gallery"}
      style={{ backgroundColor: props.bgColor }}
    >
      <aside className="work__gallery">
        <img src={`${process.env.PUBLIC_URL}/images/${props.img}`} />
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
        <div class="arrow" onClick={props.handleNext}>
          <div class="arrow-top"></div>
          <div class="arrow-bottom"></div>
        </div>
        <div className="gallery__triangle"></div>
      </article>
    </section>
  );
};

export default Gallery;
