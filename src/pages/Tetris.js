import React, { useEffect, useRef, useState } from "react";

import { default as loadTetris } from "../components/Tetris";

import "./Tetris.scss";

const Tetris = (props) => {
  const [game] = useState(new loadTetris());

  useEffect(() => {
    game.run();
    //history.replace(`/URL/${game.step()}`);
  }, []);

  const handleClick = () => {
    game.rotateBlock();
  };

  return (
    <>
      <div className="tetris__button__container">
        <button className="push--skeuo" onClick={handleClick}></button>
        <div className="tetris__close">Close</div>
      </div>
    </>
  );
};

export default Tetris;
