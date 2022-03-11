import React, { useEffect } from "react";

//Css
import "./Score.sass";

const Score = (props) => {
  return (
    <article className={"score__article"}>
      <h1 className={"score__h1"}>
        {props.location.state.score}
        <span className={"--yellow"}>.</span>
      </h1>
    </article>
  );
};

export default Score;
