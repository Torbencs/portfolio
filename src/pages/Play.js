import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Matter from "matter-js";

//Css
import "../css/layout.sass";
import "../css/play.sass";

const Play = (props) => {
  const [mouseOrigin, setMouseOrigin] = useState({
    x: null,
    y: null,
  });
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });
  const [newPos, setNewPos] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [scene, setScene] = useState();
  const [staticBallPos, setStaticBallPos] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  const [staticBallVel, setStaticBallVel] = useState({
    x: 0,
    y: 0,
  });
  const [rotate, setRotate] = useState(document.createElement("div"));

  //Event Handlers

  //Lifecycle methods
  useEffect(() => {
    props.currentPage("play");

    /* Setup game scene
    // 
    */
    //Find root div
    const wrapper = document.getElementById("appWrapper");
    //Get parent of root div
    const parent = wrapper.parentNode;
    //Set id of new div
    rotate.id = "rotate";

    const gameScene = document.createElement("div");
    //Set id of new div
    gameScene.id = "gameScene";

    /* gameScene.onclick = (e) => {
      document.requestPointerLock();
    }; */
    parent.replaceChild(rotate, wrapper);
    parent.insertBefore(gameScene, null);
    // set element as child of wrapper
    rotate.appendChild(wrapper);

    //Get center point of rotate div
    const rotateBounding = rotate.getBoundingClientRect();

    const center = {
      x: (rotateBounding.right + rotateBounding.left) / 2,
      y: (rotateBounding.bottom + rotateBounding.top) / 2,
    };

    /*Pointerlock API to keep mouse inside gamescene
    //           
    */
    document.exitPointerLock =
      document.exitPointerLock || document.mozExitPointerLock;

    document.addEventListener("pointerlockchange", pointerLockChange, false);
    document.addEventListener("mozpointerlockchange", pointerLockChange, false);

    function pointerLockChange() {
      if (document.pointerLockElement || document.mozPointerLockElement) {
        document.addEventListener("mousemove", mouseMove, false);
      } else {
        document.removeEventListener("mousemove", mouseMove, false);
        //Filthy
        window.location = "http://torbencs.github.io/portfolio";
      }
    }

    const mouseMove = (e) => {
      mousePos.x += -e.movementX * 0.06;
      mousePos.y += e.movementY * 0.06;

      rotate.style.transform = "rotate(" + mousePos.x + "deg)";

      //Rotate old static ball position by ^ degrees and find new x,y coords

      [newPos.x, newPos.y] = rotationOfAxis(
        center.x,
        center.y,
        staticBallPos.x,
        staticBallPos.y,
        -mousePos.x
      );

      //Save new static ball position in state
      setStaticBallPos({ x: newPos.x, y: newPos.y });
      //Save new static velocity in state.
      setStaticBallVel({
        x: e.movementX * 0.5,
        y: e.movementY * 0.5,
      });
    };

    /* Physics setup
    //
    */
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;

    var engine = Engine.create({
      //  positionIterations: 20,
    });

    var render = Render.create({
      element: document.getElementById("gameScene"),
      engine: engine,

      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: "transparent",
        wireframeBackground: "transparent",
        wireframes: false,
      },
    });

    engine.world.gravity = { x: 0, y: 1.5 };
    //Save render object in state for later use
    setScene(render);

    //Objects
    //-Balls
    const movingBall = Bodies.circle(props.yellowDot.x, props.yellowDot.y, 30, {
      restitution: 0.65,
      render: {
        fillStyle: "#f3c41a",
      },
    });
    const staticBall = Bodies.circle(
      staticBallPos.x,
      staticBallPos.y,
      window.innerHeight / 1.7,
      {
        restitution: 0.2,
        isStatic: true,
        render: {
          fillStyle: "#f3c41a",
        },
      }
    );
    //-Walls
    const wallTop = Bodies.rectangle(
      window.innerWidth / 2,
      -150,
      window.innerWidth,
      300,
      {
        isStatic: true,
        render: {
          fillStyle: "#fff",
        },
      }
    );
    const wallBottom = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight + 150,
      window.innerWidth,
      300,
      {
        isStatic: true,
        render: {
          fillStyle: "#fff",
        },
      }
    );
    const wallLeft = Bodies.rectangle(
      -150,
      window.innerHeight / 2,
      300,
      window.innerHeight,
      {
        isStatic: true,
        render: {
          fillStyle: "#fff",
        },
      }
    );
    const wallRight = Bodies.rectangle(
      window.innerWidth + 150,
      window.innerHeight / 2,
      300,
      window.innerHeight,
      {
        isStatic: true,
        render: {
          fillStyle: "#fff",
        },
      }
    );
    //Add objects to world
    World.add(engine.world, [wallTop, wallBottom, wallLeft, wallRight]);
    World.add(engine.world, [movingBall, staticBall]);
    //Run
    Engine.run(engine);
    Render.run(render);

    //Hide yellow dot
    props.yellowDot.el.remove();

    //Add checkered end flag
    document.getElementById("home").classList.add("checkered");

    //Component unmount cleanup
    return () => {
      console.log("unmount");
      rotate.style.transform = "none";
      render.canvas.remove();
      gameScene.remove();
      props.currentPage("home");
    };
  }, []);

  //Change static ball position
  useEffect(() => {
    if (scene) {
      let body = scene.engine.world.bodies[5];
      Matter.Body.setVelocity(body, { x: staticBallVel.x, y: staticBallVel.y });
      Matter.Body.setPosition(body, { x: staticBallPos.x, y: staticBallPos.y });
    }
  }, [staticBallPos, staticBallVel]);

  //Rotate function

  function rotationOfAxis(cx, cy, x, y, angle) {
    let radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = cos * (x - cx) + sin * (y - cy) + cx,
      ny = cos * (y - cy) - sin * (x - cx) + cy;
    return [nx, ny];
  }

  return (
    <div>
      <section></section>
    </div>
  );
};

export default Play;
