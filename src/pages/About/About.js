import React, { useEffect } from "react";

//Css
import "./About.sass";

const About = (props) => {
  return (
    <article className={"about__article"}>
      <h1 className={"about__h1"}>
        About<span className={"--yellow"}>.</span>
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
        molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
        officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
        nesciunt ipsum debitis quas aliquid. Provident similique autem.
        Veritatisobcaecati tenetur iure eius earum ut molestias architecto
        voluptate nihil, eveniet aliquid culpa Reprehenderit, quia. Quo neque
        error repudiandae fuga?
      </p>
    </article>
  );
};

export default About;
