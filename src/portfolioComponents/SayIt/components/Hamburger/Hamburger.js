import React, { useState } from "react";

//Css
import "./Hamburger.css";

export default function (props) {
  const [active, setActive] = useState(false);

  const handleClick = (event) => {
    setActive(!active);
    props.handleLogout();
  };
  return (
    <button
      className={`hamburger hamburger--minus ${active && "is-active"}`}
      type="button"
      //onClick={handleClick}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
}
