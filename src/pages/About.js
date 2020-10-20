import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import ProjectTemplate from "../components/ProjectTemplate";

//Css
import "../css/layout.sass";
import "../css/about.sass";

const About = (props) => {
  useEffect(() => {
    props.currentPage("about");
  }, []);

  return (
    <div>
      <section className={"main__section"}>
        <article className={"main__article"}>
          <div className={"about__content"}>
            <h1>
              Having recently completed a Bachelor of Business, and finding the
              financial world without the colour and vitality that feeds
              creativity, I set out to develop my entrepreneurial side and
              follow my creative instincts into the world of web development.
            </h1>
          </div>
          <div className={"about__content"}>
            <h1>
              Something about the internet being a medium or ‘canvas’ on which I
              can create interesting user experiences. With the knowledge that
              my new medium would be the internet I began learning everything
              there was to know about Javascript. My programming skills are
              largely self-taught through curiosity, experimentation, failure,
              and countless ongoing projects. Armed with creativity, business
              acumen, and endless curiosity I hope to land somewhere that will
              allow me to provide ways of doing things,
            </h1>
          </div>
        </article>
        <div className={"--circle"}></div>
      </section>
    </div>
  );
};

export default About;
