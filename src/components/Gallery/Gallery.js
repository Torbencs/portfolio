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

  const Image = () => {
    if (props.altImg) {
      window.setTimeout(() => {
        document.getElementById("img1").classList.add("fade-img-out");
        document.getElementById("img2").classList.add("fade-img-in");
      }, 4000);
      return (
        <>
          <img
            id="img1"
            src={`${process.env.PUBLIC_URL}/images/design/${props.imgSrc}`}
            className="gallery__img"
          />
          <img
            id="img2"
            src={`${process.env.PUBLIC_URL}/images/design/${props.altImg}`}
            className="gallery__img--alt"
          />
        </>
      );
    } else {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/images/design/${props.imgSrc}`}
          className="gallery__img"
        />
      );
    }
  };

  return (
    <section
      className={"work__container--gallery"}
      style={{ backgroundColor: props.bgColor }}
    >
      <aside className="work__gallery">
        <Image />
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
