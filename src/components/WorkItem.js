import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { animate } from "motion";

//Components
import Booking from "../porfolioComponents/booking/booking";
//Css
import "./WorkItem.sass";

const WorkItem = (props) => {
  const [hidden, setHidden] = useState(true);
  const handleClick = () => {
    document.body.style.border = "none";
    setHidden(!hidden);
  };
  const handleExit = () => {
    setHidden(!hidden);
    document.body.style.border = "40px solid #ffffff";
  };
  const HiddenContent = () => {
    //Toggle body border when in fullsreen mode

    return (
      <div className={"workItem__fullscreen"}>
        <div className={"workItem__exit"} onClick={handleExit} />
        {props.page}
      </div>
    );
  };
  const Thumbnail = () => (
    <div className={"workItem__container"} onClick={handleClick}>
      <img src={props.src} className={"workItem__thumbnail"} />
    </div>
  );

  return hidden ? (
    <Thumbnail />
  ) : (
    <React.Fragment>
      <Thumbnail />
      <HiddenContent />
    </React.Fragment>
  );
};

export default WorkItem;
