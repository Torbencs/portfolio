import React, { useEffect, useRef, useState } from "react";

import Tetris from "../components/Tetris";

const URL = (props) => {
  const [game] = useState(new Tetris());

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

export default URL;
