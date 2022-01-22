import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

//Sub components
import WorkItem from "./WorkItem";
//Pages
import ClimbWest from "../pages/ClimbWest/ClimbWest.js";
import MovieQuiz from "../pages/MovieQuiz/MovieQuiz";

//Css
import "./Work.sass";
//Thumbnails

const Work = (props) => {
  return (
    <section className={"work__section"}>
      <h1 className={"work__h1"}>
        Work<span className={"--yellow"}>.</span>
      </h1>
      <h3 className={"work__h3"}>Dev | Data | Design</h3>
      <article className={"work__article"}>
        {/* <WorkItem title={"Movie Quiz"} page={<MovieQuiz />} />
        <WorkItem title={"Fern Apparel"} src={ThumbFA} page={""} />
        <WorkItem title={"SeaGuard"} src={ThumbRI} page={""} />
        <WorkItem title={"Brogan's Way"} src={ThumbFA} page={""} />
        <WorkItem title={"RealEstate Image"} src={ThumbRI} page={""} />
        <WorkItem title={"Recycle Responsibly"} src={ThumbCW} page={""} /> */}
      </article>
    </section>
  );
};

export default Work;
