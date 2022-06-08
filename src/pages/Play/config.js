import { Bodies, Body } from "matter-js";
import { Quad, SemiCircle, Tri, Arch } from "./Shapes";

//Starting options
export const anchor = {
  x: 600,
  y: 300,
};
export const startPos = {
  x: anchor.x,
  y: 680,
};
const player = {
  radius: 30,
};

//Object of levels
export const levels = [
  {
    semi: {
      body: () =>
        SemiCircle(anchor.x, anchor.y + 200, 100, 120, {
          label: "obstacle",
          mass: 50,
          restitution: 0.99,
          friction: 0.003,
          isStatic: true,
          angle: 2 * Math.PI,
          render: {
            fillStyle: "#fb836f",
          },
        }),
      constraint: () => [],
    },
    goal: {
      body: () => {
        let arch = Arch(anchor.x, anchor.y, 100, 60, 0.86, {
          label: "goal",
          mass: 50,
          restitution: 0.99,
          friction: 0.003,
          isStatic: true,

          render: {
            fillStyle: "#fbd277",
          },
        });
        Body.setAngle(arch, Math.PI);
        return arch;
      },
      constraint: () => [],
    },

    tri: {
      body: () =>
        Tri(
          anchor.x,
          anchor.y + 131, //Plus half the rectangle and half the circle and a small bit to seperate them
          80,
          {
            label: "obstacle3",
            mass: 50,
            restitution: 0.99,
            friction: 0.003,
            isStatic: true,
            angle: (3 * Math.PI) / 4,

            render: {
              fillStyle: "#fbd277",
            },
          }
        ),
      constraint: () => [],
    },
    player: {
      label: "Player",
      body: () =>
        Bodies.circle(
          startPos.x,
          startPos.y,
          player.radius,
          {
            label: "player",
            mass: 5,
            restitution: 0.9,
            friction: 0.01,
            frictionAir: 0.015,
            collisionFilter: {
              group: -1,
              category: 1,
            },
            render: {
              fillStyle: "#fbd277",
            },
          },
          30
        ),
      constraint: () => [],
    },
  },
];

// quad: {
//       position: {
//         x: 200,
//         y: 200,
//       },
//       body: () =>
//         Quad(anchor.x - 10, anchor.y, 70, 120, {
//           label: "goal",
//           mass: 50,
//           restitution: 0.99,
//           friction: 0.003,
//           isStatic: true,
//           render: {
//             fillStyle: "#f4dc02",
//           },
//         }),
//     },
