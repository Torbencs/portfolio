import React, { useEffect, useRef, useState } from "react";

import { default as loadTetris } from "../components/Tetris";

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
    <div>
      <h1 onClick={handleClick}>URL Page</h1>

      <button onClick={() => alert("Pause")}>Pause Button</button>
    </div>
  );
};

export default Tetris;
