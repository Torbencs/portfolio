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
        Hey! I'm Torben, half Australian, half Danish and currently living in
        Norway. I hold a bachelor degree in business but my real passion is
        problem solving and transforming ideas into designs and designs into
        code. <br></br>I am predominately self taught and driven by an
        insatiable curiosity to learn and as such have a broad range of skills
        to offer. What I may lack in industry experience I believe I make up for
        in my eagerness to learn and strong work ethic.
      </p>

      <a href="mailto:tschlawe@gmail.com" className="about__links">
        Email
      </a>
    </article>
  );
};

export default About;
