import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Matter from "matter-js";

//Css
import "../css/layout.sass";
import "../css/play.sass";

const Play = (props) => {
  const [x, setX] = useState(null);
  const [renderState, setRenderState] = useState(null);

  //Lifecycle methods
  useEffect(() => {
    props.currentPage("play");

    /* Setup game scene */
    //Find root div
    const wrapper = document.getElementById("appWrapper");
    //Get parent of root div
    const parent = wrapper.parentNode;
    //Make the new div to be rotated
    let rotate = document.createElement("div");
    //Set id of new div
    rotate.id = "rotate";

    const gameScene = document.createElement("div");
    //Set id of new div
    gameScene.id = "gameScene";
    //Mouse eventhandler
    gameScene.onmousemove = (e) => turn(e);

    //
    parent.replaceChild(rotate, wrapper);
    parent.insertBefore(gameScene, null);
    // set element as child of wrapper
    rotate.appendChild(wrapper);

    //Physics setup
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;

    var engine = Engine.create({
      // positionIterations: 20
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

    var ballA = Bodies.circle(800, 100, 30, { restitution: 0.5 });
    var ballB = Bodies.circle(800, 750, 80, {
      restitution: 0.5,
      isStatic: true,
    });
    World.add(engine.world, [
      // walls
      Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 10, {
        isStatic: true,
        render: {
          fillStyle: "#fff",
        },
      }),
      Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight,
        window.innerWidth,
        10,
        {
          isStatic: true,
          render: {
            fillStyle: "#fff",
          },
        }
      ),
    ]);

    World.add(engine.world, [ballA, ballB]);

    Engine.run(engine);

    Render.run(render);

    setRenderState(render);

    /* Matter.Body.setPosition(ballB, { x: pos.x, y: pos.y }); */
  }, []);

  useEffect(() => {
    console.log(renderState);
  }, [renderState]);

  const setMouseOrigin = (e) => {
    setX(e.clientX);
  };
  const turn = (e) => {
    document.getElementById("rotate").style.transform =
      "rotate(" + (x - e.clientX) / -10 + "deg)";

    //console.log(e.clientX);
  };

  return (
    <div>
      <section>
        <div className={"--circle"}></div>
      </section>
    </div>
  );
};

export default Play;
