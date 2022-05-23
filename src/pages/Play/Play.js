import React, { useEffect, useRef, useState } from "react";
import {
  Engine,
  Render,
  Bodies,
  Composite,
  Body,
  Runner,
  Events,
  Mouse,
  MouseConstraint,
} from "matter-js";
import { Position } from "@react-three/drei/helpers/Position";

function Play(props) {
  const scene = useRef();
  const isPressed = useRef(false);
  const engine = useRef(Engine.create());
  const runner = useRef(Runner.create());

  //Mouse state
  const [mouseDown, setMouseDown] = useState(null);
  const [mouseUp, setMouseUp] = useState(null);

  //Object of levels
  const levels = [
    {
      player: {
        label: "Player",
        body: () =>
          Bodies.circle(800, 300, 30, {
            label: "player",
            mass: 10,
            restitution: 0.9,
            friction: 0.003,
            render: {
              fillStyle: "#0000ff",
            },
          }),
      },
      goal: {
        position: {
          x: 200,
          y: 200,
        },
        body: () =>
          Bodies.circle(40, 300, 30, {
            label: "goal",
            mass: 10,
            restitution: 0.9,
            friction: 0.003,
            render: {
              fillStyle: "#000000",
            },
          }),
      },
      // line: {
      //   position: {
      //     start: {
      //       x: 2,
      //       y: 23,
      //     },
      //     end: {
      //       x: 30,
      //       y: 30,
      //     },
      //   },
      // },
    },
  ];

  useEffect(() => {
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
      },
    });

    engine.current.world.gravity.scale = 0;

    //Add all the bodies from the 'levels' object
    for (let key in levels[0]) {
      let body = levels[0][key].body();
      Composite.add(engine.current.world, [body]);
    }

    //Walls
    Composite.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
    ]);

    Render.run(render);
    Runner.run(runner.current, engine.current);

    return () => {
      Render.stop(render);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  function handleMouseUp() {
    let force;
    let body = engine.current.world.bodies.find(
      (bodies) => bodies.label == "player"
    );
    body &&
      Body.applyForce(body, body.position, {
        x: (mouseDown[0] - mouseUp[0]) / 100,
        y: 0,
      });
  }

  const handleClick = (e) => {
    let body = engine.current.world.bodies.find(
      (bodies) => bodies.label == "torbs"
    );
    body && Body.applyForce(body, body.position, { x: 1, y: 0 });
  };

  return (
    <div
      ref={scene}
      style={{ width: "100%", height: "100%" }}
      onMouseDown={(e) => setMouseDown([e.clientX, e.clientY])}
      onMouseUp={(e) => handleMouseUp([e.clientX, e.clientY])}
    ></div>
  );
}

export default Play;
