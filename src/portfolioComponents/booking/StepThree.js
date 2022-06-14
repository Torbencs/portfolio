import React, { useState } from "react";
import Participants from "./Participants/Participants";
import "./form.sass";
import "./animations.css";

export default (props) => {
  return (
    <div className={"slideIn"}>
      <h1 className={"form__h1"}>How many people are you booking for?</h1>
      <Participants />
    </div>
  );
};
