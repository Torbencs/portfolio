import React, { useEffect, useRef, useState } from "react";
//Matterjs physics
import {
  Engine,
  Render,
  Bodies,
  Composite,
  Composites,
  Body,
  Events,
  Runner,
  Common,
  World,
} from "matter-js";
import { Position } from "@react-three/drei/helpers/Position";

//Utils
import { BetweenRange, EuclidDist } from "./Utils";
//Levels
import { levels, startPos, anchor } from "./config";
//Css
import "./Play.sass";

function Play() {
  const scene = useRef();
  const isPressed = useRef(false);
  const engine = useRef(Engine.create());
  const runner = useRef(Runner.create());

  //Instructions
  const [showInstructions, setShowInstructions] = useState(true);
  //Mouse state
  const [mouseDown, setMouseDown] = useState(null);
  const [mouseUp, setMouseUp] = useState(null);

  //Score
  const [score, setScore] = useState(0);
  //Has the game ended
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    let currentLevel = 4;
    // Has the game ended?
    let gameEnded = false;
    //Score
    let score = 0;
    //Ball moving?
    let ballActive = false;
    //Ball in play?
    let ballStarted = false;
    //Has the end animation started?
    let endAnimStarted = false;

    const cw =
      document.body.clientWidth -
      document.getElementById("play__nav__container").offsetWidth;
    const ch = document.body.clientHeight;

    var render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        showPositions: false,
        background: '"transparent"',
      },
    });

    engine.current.world.gravity.scale = 0;

    //Events
    //--Using the matterjs event module instead of running own game loop
    Events.on(runner.current, "afterTick", () => {
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
        ballStarted = false;
        score++;
        //TODO fix par from updating after next lvl load
        setScore(score);
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
        let goal = engine.current.world.bodies.find(
          (bodies) => bodies.label == "goal"
        );
        //If player collides with goal go to next level
        if (
          player.render.fillStyle == collision.bodyA.render.fillStyle &&
          collision.bodyA.label == "goal" &&
          collision.bodyB.label == "player"
        ) {
          if (!endAnimStarted) {
            goal.render.visible = false;
            endAnimStarted = true;

            let shatterBodies = Composites.stack(
              goal.position.x,
              goal.position.y,
              5,
              5,
              0,
              0,
              (x, y) =>
                Bodies.circle(x, y, Common.random(1, 6), {
                  mass: 0.1,
                  restitution: 0.99,
                  friction: 0.003,
                  render: {
                    //fillStyle: "#fbd277",
                  },
                })
            );

            Composite.add(engine.current.world, shatterBodies);
            for (let i = 0; i < shatterBodies.bodies.length; i++) {
              Body.applyForce(
                shatterBodies.bodies[i],
                shatterBodies.bodies[i].position,
                {
                  x:
                    Common.random(0, 0.003) *
                    BetweenRange(player.velocity.x, -1, 1),
                  y:
                    Common.random(0, 0.003) *
                    BetweenRange(player.velocity.y, -1, 1),
                }
              );
            }
            setTimeout(() => {
              endAnimStarted = false;
              //Go to next level
              currentLevel++;
              loadLevel(currentLevel, render);
            }, 3400);
          }
        }

        //If the player collides with an obstacle that isn't a wall or the goal then change the colour of the player to the obstacle colour
        if (
          collision.bodyA.label !== "wall" &&
          collision.bodyA.label !== "goal" &&
          collision.bodyB.label == "player"
        ) {
          goal.render.fillStyle = collision.bodyA.render.fillStyle;
        }
      });
    });
    loadLevel(currentLevel);

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
  }, []);

  function loadLevel(level, render) {
    Composite.clear(engine.current.world);
    Engine.clear(engine.current);

    if (typeof levels[level] == "undefined") {
      Runner.stop(runner.current);
      Render.stop(render);
      World.clear(engine.current.world);
      Engine.clear(engine.current);

      setGameEnded(true);
    } else {
      //Add all the bodies from the 'levels' object
      for (let key in levels[level]) {
        let body = levels[level][key].body();

        let constraint = levels[level][key].constraint();

        Composite.add(engine.current.world, [body, constraint]);
      }

      const cw =
        document.body.clientWidth -
        document.getElementById("play__nav__container").offsetWidth;
      const ch = document.body.clientHeight;

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
    }
  }

  function handleMouseDown(e) {
    e.preventDefault();
    setShowInstructions(false);
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
    e.preventDefault();
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
    e.preventDefault();
    let force = {
      x: BetweenRange(-(x - mouseDown.x) * 0.0015, -0.6, 0.6),
      y: BetweenRange(-(y - mouseDown.y) * 0.0015, -0.6, 0.6),
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
    //TODO - Figur out a way to reset in useEffct without the weird side effects
    window.location.reload();
  }

  //Game overlays
  const GameEnded = () => (
    <div className="play__notification">
      {score <= 12 && (
        <h1>
          You only used{" "}
          <span className="play__notification--yellow">{score}</span> balls, not
          bad at all!
        </h1>
      )}
      {score > 12 && (
        <h1>
          Yikes, <span className="play__notification--yellow">{score}</span>{" "}
          balls.. Let's try again.
        </h1>
      )}

      <p>Would you like more levels?</p>
      <div>
        <button className="play__notification__thumbs">👍</button>
        <button className="play__notification__thumbs play__notification__thumbs--red">
          👎
        </button>
      </div>
      <button onClick={() => reset()}>Retry</button>
    </div>
  );
  const GameInstructions = () => (
    <div className="play__notification">
      <img
        src={`${process.env.PUBLIC_URL}/images/play/eclipse_logo_med_crop.png`}
      />

      <button onClick={() => setShowInstructions(false)}>Start</button>
    </div>
  );

  return (
    <>
      <div id="play__nav__container">
        <nav className="play__nav__score">
          <h1 className="score__title">Score</h1>
          <h2 className="score__number">{score}</h2>
        </nav>
      </div>
      <div
        id="play__canvas"
        ref={scene}
        style={{ display: "inline-block" }}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseUp={(e) => handleMouseUp({ x: e.clientX, y: e.clientY })}
        onTouchStart={(e) => handleMouseDown(e)}
        onTouchMove={(e) => handleMouseMove(e)}
        onTouchEnd={(e) => handleMouseDown({ x: e.clientX, y: e.clientY })}
      ></div>
      {gameEnded && <GameEnded />}
      {showInstructions && <GameInstructions />}
    </>
  );
}

export default Play;
