import React from "react";

import ProfilePhoto from "./profile.png";

//Css
import "./About.sass";

const About = (props) => {
  return (
    <article className={"about__article"}>
      <img src={ProfilePhoto} alt="Profile of Torben" className="about__img" />
      <p className="about__subheading">UX | Front End</p>
      <p>
        Hey! I'm Torben, half Australian, half Danish, currently living in sunny
        Denmark. I hold a bachelor's degree in business but my passion is
        problem-solving and transforming ideas into code, particularly
        interested in integrating new AI solutions and reshaping the way we
        interact and interface with technologies<br></br>I am predominately self
        taught and driven by an insatiable curiosity to learn and understand the
        bigger picture. Due to this I have many areas of interest and a broad
        range of skills. What I may lack in industry experience I believe I make
        up for in my eagerness to learn, ability to pick things up quickly, and
        strong work ethic.
        <br></br>When I'm not behind the screen I'm usually dreaming up new
        ideas while sailing or climbing.
        <br></br>Currently searching for a junior developer role in an exciting
        company with a purpose.
      </p>

      <a
        href="https://www.linkedin.com/in/torben-schlawe-b27b9278/"
        target="_blank"
        rel="noopener noreferrer"
        className="about__links"
      >
        LinkedIn
      </a>
      <a
        href="https://github.com/torbencs"
        target="_blank"
        rel="noopener noreferrer"
        className="about__links"
      >
        GitHub
      </a>
      <a href="mailto:tschlawe@gmail.com" className="about__links">
        Email
      </a>
    </article>
  );
};

export default About;
