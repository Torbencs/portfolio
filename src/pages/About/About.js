import React, { useEffect } from "react";

import ProfilePhoto from "./profile.png";

//Css
import "./About.sass";

const About = (props) => {
  return (
    <article className={"about__article"}>
      <img
        src={ProfilePhoto}
        alt="Profile photo of Torben"
        className="about__img"
      />
      <p className="about__subheading">Graphic Design | Web Development</p>
      <p>
        Hey! I'm Torben, half Australian, half Danish, currently living in
        Norway. I hold a bachelor degree in business but my passion is problem
        solving and transforming ideas into designs and designs into code.{" "}
        <br></br>I am predominately self taught and driven by an insatiable
        curiosity to learn and understand the bigger picture. Due to this I have
        many areas of interest and a broad range of skills. What I may lack in
        industry experience I believe I make up for in my eagerness to learn,
        ability to pick things up quickly, and strong work ethic.
        <br></br>When I'm not behind the screen I'm usually dreaming up new
        ideas while sailing or climbing.
        <br></br>Currently searching for an entry level role in an exciting
        company with a purpose.
      </p>

      <a href="mailto:tschlawe@gmail.com" className="about__links">
        Email
      </a>
      <a href="https://github.com/torbencs" className="about__links">
        GitHub
      </a>
    </article>
  );
};

export default About;
