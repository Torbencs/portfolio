import React, { useEffect, useRef, useState } from "react";

//Matterjs physics
import {
  Engine,
  Render,
  Bodies,
  Composite,
  Body,
  Events,
  Runner,
  Common,
} from "matter-js";
import { Position } from "@react-three/drei/helpers/Position";

//Components
import Score from "./Score";
//Utils
import { BetweenRange, EuclidDist } from "./Utils";

//Levels
import { levels, startPos, anchor } from "./config";

function Play({ handleScore }) {
  const scene = useRef();
  const isPressed = useRef(false);
  const engine = useRef(Engine.create());
  const runner = useRef(Runner.create());

  //Level state
  const [currentLevel, setCurrentLevel] = useState(0);
  // Has the game ended?
  const [gameEnded, setGameEnded] = useState(false);
  //Mouse state
  const [mouseDown, setMouseDown] = useState(null);
  const [mouseUp, setMouseUp] = useState(null);

  useEffect(() => {
    const cw =
      document.body.clientWidth -
      document.getElementById("score__header").getBoundingClientRect().width;
    const ch = document.body.clientHeight;

    let ballActive = false;
    let ballStarted = false;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        showPositions: false,
        background: "transparent",
      },
    });

    engine.current.world.gravity.scale = 0;

    //Events
    //--Using the matterjs event module instead of running own game loop
    Events.on(runner.current, "afterTick", () => {
      //-- Check if player has reached the goal
      let player = engine.current.world.bodies.find(
        (bodies) => bodies.label == "player"
      );
      let goal = engine.current.world.bodies.find(
        (bodies) => bodies.label == "goal"
      );

      //-- Check if ball is in play
      if (player.speed > 0.09) {
        ballActive = true;
        ballStarted = true;

        //-- Remove the aiming circles if body is moving
        for (let i = 1; i < 3; i++) {
          let aimCircle = engine.current.world.bodies.find(
            (bodies) => bodies.label == `player_aim_circle_${i}`
          );
          aimCircle && Composite.remove(engine.current.world, aimCircle);
        }
      } else if (player.speed < 0.09) {
        ballActive = false;
      }
      if (!ballActive && ballStarted) {
        handleScore((prev) => prev - 1);
        ballStarted = false;
      }
    });
    //-- Change zindex of bodies so the player is always rendered above the goal
    Events.on(engine.current.world, "afterAdd", function (items) {
      engine.current.world.bodies.sort((a, b) => {
        return b.collisionFilter.category - a.collisionFilter.category;
      });
    });

    //-- Collision events
    Events.on(engine.current, "collisionStart", (event) => {
      event.pairs.forEach((collision) => {
        let player = engine.current.world.bodies.find(
          (bodies) => bodies.label == "player"
        );

        //If player collides with goal go to next level
        if (
          player.render.fillStyle == collision.bodyA.render.fillStyle &&
          EuclidDist(
            [anchor.x, anchor.y],
            [player.position.x, player.position.y]
          ) < 25
        ) {
          //Go to next level
          setCurrentLevel(currentLevel + 1);
        }

        //If the player collides with an obstacle that isn't a wall or the goal then change the colour of the player to the obstacle colour
        if (
          collision.bodyA.label !== "wall" &&
          collision.bodyA.label !== "goal" &&
          collision.bodyB.label == "player"
        ) {
          player.render.fillStyle = collision.bodyA.render.fillStyle;
        }
      });
    });

    //Add all the bodies from the 'levels' object
    for (let key in levels[currentLevel]) {
      let body = levels[currentLevel][key].body();

      let constraint = levels[currentLevel][key].constraint();

      Composite.add(engine.current.world, [body, constraint]);
    }

    //Walls
    Composite.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -51, cw, 100, {
        label: "wall",
        isStatic: true,
        restitution: 0.99,
        mass: 50,
      }),
      Bodies.rectangle(-51, ch / 2, 100, ch, {
        label: "wall",
        isStatic: true,
        restitution: 0.99,
        mass: 50,
      }),
      Bodies.rectangle(cw / 2, ch + 51, cw, 100, {
        label: "wall",
        isStatic: true,
        restitution: 0.99,
        mass: 50,
      }),
      Bodies.rectangle(cw + 51, ch / 2, 100, ch, {
        label: "wall",
        isStatic: true,
        restitution: 0.99,
        mass: 50,
      }),
    ]);

    Render.run(render);
    Runner.run(runner.current, engine.current);

    return () => {
      Render.stop(render);
      Composite.clear(engine.current.world);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, [currentLevel]);

  function handleMouseDown(e) {
    //Find player body
    let player = engine.current.world.bodies.find(
      (bodies) => bodies.label == "player"
    );
    //Save mousedown position to calculate how much force user intends to use
    setMouseDown({ x: e.clientX, y: e.clientY });
    //Check that ball is not in play
    if (player.speed < 0.09) {
      //Add UI circles to assist aim accuracy
      for (let i = 1; i < 3; i++) {
        Composite.add(
          engine.current.world,
          Bodies.circle(
            player.position.x,
            player.position.y,
            (30 * i) / 4,
            {
              label: `player_aim_circle_${i}`,
              isSensor: true,
              render: {
                fillStyle: player.render.fillStyle,
              },
            },
            3
          )
        );
      }
    }
  }
  function handleMouseMove(e) {
    for (let i = 1; i < 3; i++) {
      let aimCircle = engine.current.world.bodies.find(
        (bodies) => bodies.label == `player_aim_circle_${i}`
      );

      if (aimCircle) {
        let player = engine.current.world.bodies.find(
          (bodies) => bodies.label == "player"
        );

        let xPos =
          player.position.x +
          (BetweenRange(mouseDown.x - e.clientX, -350, 350) / i) * 0.4;
        let yPos =
          player.position.y +
          (BetweenRange(mouseDown.y - e.clientY, -350, 350) / i) * 0.4;

        Body.setPosition(aimCircle, {
          x: xPos,
          y: yPos,
        });
      }
    }
  }
  function handleMouseUp({ x, y }) {
    let force = {
      x: BetweenRange(-(x - mouseDown.x) * 0.001, -0.6, 0.6),
      y: BetweenRange(-(y - mouseDown.y) * 0.001, -0.6, 0.6),
    };
    let player = engine.current.world.bodies.find(
      (bodies) => bodies.label == "player"
    );

    //Check if player body exists and if that it is not already moving
    if (player && player.speed < 0.09) {
      Body.applyForce(player, player.position, force);
    }
  }

  //Reset level
  function reset() {
    let player = engine.current.world.bodies.find(
      (bodies) => bodies.label == "player"
    );
    setGameEnded(false);
    handleScore(3);
    //reset player position
    Body.setVelocity(player, { x: 0, y: 0 });
    Body.setPosition(player, { x: startPos.x, y: startPos.y });
  }

  //Game overlays
  const GameEnded = () => (
    <div className="Play__gameEnded">
      <h1>Game Over</h1>
      <button onClick={reset()}>Play again?</button>
    </div>
  );

  return (
    <>
      <div
        ref={scene}
        style={{ width: "100%", height: "100%" }}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseUp={(e) => handleMouseUp({ x: e.clientX, y: e.clientY })}
      ></div>
      {gameEnded && <GameEnded />}
    </>
  );
}

export default Play;
