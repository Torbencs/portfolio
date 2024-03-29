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

//Utils
import { BetweenRange, getIsPortrait } from "./Utils";
//Levels
import { levels, startPos, anchor } from "./config";
//Css
import "./Play.sass";

function Play(props) {
  const scene = useRef();
  const isPressed = useRef(false);
  const engine = useRef(Engine.create());
  const runner = useRef(Runner.create());

  //Instructions
  const [showInstructions, setShowInstructions] = useState(true);
  //Is the device in portrait orientation
  const [isPortrait, setIsPortrait] = useState(getIsPortrait());
  //Mouse state
  const [mouseDown, setMouseDown] = useState(null);
  const [mouseUp, setMouseUp] = useState(null);

  //Score
  const [score, setScore] = useState(0);
  //Has the game ended
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    function orientationChange() {
      //Set true if in portrait orientation
      setIsPortrait(getIsPortrait());
    }

    window.addEventListener("resize", orientationChange);
    return () => window.removeEventListener("resize", orientationChange);
  }, []);

  useEffect(() => {
    //Zero index
    let currentLevel = 0;
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

      //Only run if player is defined
      if (player) {
        //-- Check if ball is in play
        if (player.speed > 0.15) {
          ballActive = true;
          ballStarted = true;

          //-- Remove the aiming circles if body is moving
          for (let i = 1; i < 3; i++) {
            let aimCircle = engine.current.world.bodies.find(
              (bodies) => bodies.label == `player_aim_circle_${i}`
            );
            aimCircle && Composite.remove(engine.current.world, aimCircle);
          }
        } else if (player.speed < 0.15) {
          ballActive = false;
        }
        if (!ballActive && ballStarted) {
          ballStarted = false;
          score++;
          //TODO fix par from updating after next lvl load
          setScore(score);
        }
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

  function handleMouseDown(x, y) {
    setShowInstructions(false);
    //Find player body
    let player = engine.current.world.bodies.find(
      (bodies) => bodies.label == "player"
    );
    //Save mousedown position to calculate how much force user intends to use
    setMouseDown({ x: x, y: y });
    //Check that ball is not in play
    if (player.speed < 0.13) {
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
  function handleMouseMove(x, y) {
    for (let i = 1; i < 3; i++) {
      let aimCircle = engine.current.world.bodies.find(
        (bodies) => bodies.label == `player_aim_circle_${i}`
      );

      if (aimCircle) {
        let player = engine.current.world.bodies.find(
          (bodies) => bodies.label == "player"
        );

        let xPos =
          player.position.x -
          (BetweenRange(mouseDown.x - x, -350, 350) / i) * 0.4;
        let yPos =
          player.position.y -
          (BetweenRange(mouseDown.y - y, -350, 350) / i) * 0.4;

        Body.setPosition(aimCircle, {
          x: xPos,
          y: yPos,
        });
      }
    }
  }
  function handleMouseUp(x, y) {
    let force = {
      x: BetweenRange((x - mouseDown.x) * 0.0015, -0.6, 0.6),
      y: BetweenRange((y - mouseDown.y) * 0.0015, -0.6, 0.6),
    };
    let player = engine.current.world.bodies.find(
      (bodies) => bodies.label == "player"
    );

    //Check if player body exists and if that it is not already moving
    if (player && player.speed < 0.15) {
      Body.applyForce(player, player.position, force);
    }
  }

  //Reset level
  function reset() {
    //TODO - Figure out a way to reset in useEffect without the weird side effects
    window.location.reload();
  }

  //Game overlays
  const GameEnded = () => (
    <div className="play__notification play__notification--small">
      {score <= 12 && (
        <h1>
          You used <span className="play__notification--yellow">{score}</span>{" "}
          balls, not bad at all!
        </h1>
      )}
      {score > 12 && (
        <h1>
          Yikes, <span className="play__notification--yellow">{score}</span>{" "}
          balls.. Let's try again.
        </h1>
      )}

      {/* <p>Would you like more levels?</p> */}
      {/* <div>
        <button className="play__notification__thumbs">👍</button>
        <button className="play__notification__thumbs play__notification__thumbs--red">
          👎
        </button>
      </div> */}
      <button onClick={() => reset()}>Retry</button>
    </div>
  );
  const GameInstructions = () => (
    <div className="play__notification">
      <img
        width={800}
        height={316}
        src={`${process.env.PUBLIC_URL}/images/play/eclipse_logo_med_crop.png`}
      />
      <p>
        Try to smash the two yellow circles together - if they are different
        colours they will just eclipse. Click and drag to move!{" "}
      </p>

      <button onClick={() => setShowInstructions(false)}>Start</button>
    </div>
  );

  const GamePortrait = () => (
    <div className="play__notification">
      <h1>
        Please <span className="play__notification--yellow">rotate</span> your
        device to play!
      </h1>
    </div>
  );

  return (
    <>
      <div id="play__nav__container">
        <nav className="play__nav__score">
          <h1 className="play__nav__title">Ball</h1>
          <h2 className="play__nav__number">{score}</h2>
        </nav>
      </div>
      <div
        className="play__close"
        onClick={() => props.history.push("/")}
      ></div>

      <div
        id="play__canvas"
        ref={scene}
        style={{ display: "inline-block", touchAction: "none" }}
        onMouseDown={(e) => handleMouseDown(e.clientX, e.clientY)}
        onMouseMove={(e) => handleMouseMove(e.clientX, e.clientY)}
        onMouseUp={(e) => handleMouseUp(e.clientX, e.clientY)}
        onTouchStart={(e) =>
          handleMouseDown(
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY
          )
        }
        onTouchMove={(e) =>
          handleMouseMove(
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY
          )
        }
        onTouchEnd={(e) =>
          handleMouseUp(
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY
          )
        }
      ></div>
      {isPortrait && <GamePortrait />}
      {showInstructions && !isPortrait && <GameInstructions />}
      {gameEnded && !isPortrait && <GameEnded />}
    </>
  );
}

export default Play;
