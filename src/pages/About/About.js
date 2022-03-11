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
      <p>
        In 2019 I finished studying a business degree in the sunny city of
        Melbourne, Australia and packed my bags to move my life across the world
        to the not so sunny city of Copenhagen, Denmark. As the new year rolled
        in bringing with it a global pandemic, I redirected my curiosity to
        explore the world towards furthering my web development skills and
        knowledge. <br />
        With a formal education in business and experience in design and web
        development, I am able to combine both the creative process with
        analytic thought and problem solving, working well both independantly
        and in teams, sometimes being the conduit between people of both
        disciplines.
      </p>

      <p>
        I am predominately self taught and driven to learn by an insatiable
        curiosity and genuine love for designing the visual and problem solving
        the technical. Searching deep into obscure discontinued github repos or
        long abandoned Stackoverflow posts from 2003 - Love it.
      </p>

      <a href="mail" className="about__links">
        Email
      </a>

      <a href="linkedin.com" className="about__links">
        LinkedIn
      </a>
    </article>
  );
};

export default About;
