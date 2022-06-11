import { Bodies, Body } from "matter-js";
import { Quad, SemiCircle, Tri, Arch } from "./Shapes";

//Starting options
export const anchor = {
  x: (document.body.offsetWidth - 240) / 2 - 100,
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
      body: () =>
        Bodies.circle(
          anchor.x,
          anchor.y,
          player.radius,
          {
            label: "goal",
            mass: 5,
            restitution: 0.9,
            friction: 0.01,
            frictionAir: 0.015,
            isSensor: true,
            render: {
              fillStyle: "#fbd277",
            },
          },
          30
        ),
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
  //Level two ------------
  {
    tri: {
      body: () =>
        Tri(anchor.x + 300, anchor.y, 101, {
          label: "tri1",
          mass: 50,
          restitution: 0.99,
          friction: 0.003,
          isStatic: true,
          angle: Math.PI / 4,
          render: {
            fillStyle: "#001b65",
          },
        }),
      constraint: () => [],
    },
    semi: {
      body: () =>
        SemiCircle(anchor.x - 320, anchor.y, 50, 120, {
          label: "semi",
          mass: 50,
          restitution: 0.99,
          friction: 0.003,
          isStatic: true,
          angle: 1.5 * Math.PI,
          render: {
            fillStyle: "#fbd277",
          },
        }),
      constraint: () => [],
    },

    goal: {
      body: () =>
        Bodies.circle(
          anchor.x + 100,
          anchor.y,
          player.radius,
          {
            label: "goal",
            mass: 5,
            restitution: 0.9,
            friction: 0.01,
            frictionAir: 0.015,
            isSensor: true,
            render: {
              fillStyle: "#001b65",
            },
          },
          30
        ),
      constraint: () => [],
    },

    player: {
      label: "Player",
      body: () =>
        Bodies.circle(
          anchor.x - 100,
          anchor.y,
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
  //Level three ------------
  {
    quad: {
      body: () =>
        Quad(anchor.x - 120, anchor.y, 70, 120, {
          label: "quad1",
          mass: 50,
          restitution: 0.99,
          friction: 0.003,
          isStatic: true,
          render: {
            fillStyle: "#fbd277",
          },
        }),
      constraint: () => [],
    },
    quad2: {
      body: () =>
        Quad(anchor.x - 120, anchor.y + 139, 70, 120, {
          label: "quad2",
          mass: 50,
          restitution: 0.99,
          friction: 0.003,
          isStatic: true,
          angle: -Math.PI / 2,
          render: {
            fillStyle: "#fbd277",
          },
        }),
      constraint: () => [],
    },
    quad3: {
      body: () =>
        Quad(anchor.x + 100, anchor.y + 120, 70, 120, {
          label: "quad3",
          mass: 50,
          restitution: 0.99,
          friction: 0.003,
          isStatic: true,
          angle: Math.PI / 2,
          render: {
            fillStyle: "#fb836f",
          },
        }),
      constraint: () => [],
    },
    quad4: {
      body: () =>
        Quad(anchor.x + 100, anchor.y + 259, 70, 120, {
          label: "quad4",
          mass: 50,
          restitution: 0.99,
          friction: 0.003,
          isStatic: true,
          angle: Math.PI,
          render: {
            fillStyle: "#fb836f",
          },
        }),
      constraint: () => [],
    },

    goal: {
      body: () =>
        Bodies.circle(
          anchor.x + 120,
          anchor.y - 16,
          player.radius,
          {
            label: "goal",
            mass: 5,
            restitution: 0.9,
            friction: 0.01,
            frictionAir: 0.015,
            isSensor: true,
            render: {
              fillStyle: "#fb836f",
            },
          },
          30
        ),
      constraint: () => [],
    },

    player: {
      label: "Player",
      body: () =>
        Bodies.circle(
          anchor.x - 141,
          anchor.y + 278,
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
  //Level four ------------
  {
    tri: {
      body: () =>
        Tri(anchor.x - 130, anchor.y, 101, {
          label: "tri1",
          mass: 50,
          restitution: 0.99,
          friction: 0.003,
          isStatic: true,
          angle: Math.PI / 2,
          render: {
            fillStyle: "#001b65",
          },
        }),
      constraint: () => [],
    },
    tri2: {
      body: () =>
        Tri(anchor.x - 130, anchor.y + 240, 101, {
          label: "tri2",
          mass: 50,
          restitution: 0.99,
          friction: 0.003,
          isStatic: true,

          render: {
            fillStyle: "#fbd277",
          },
        }),
      constraint: () => [],
    },

    goal: {
      body: () =>
        Bodies.circle(
          anchor.x + 130,
          anchor.y + 240,
          player.radius,
          {
            label: "goal",
            mass: 5,
            restitution: 0.9,
            friction: 0.01,
            frictionAir: 0.015,
            isSensor: true,
            render: {
              fillStyle: "#001b65",
            },
          },
          30
        ),
      constraint: () => [],
    },

    player: {
      label: "Player",
      body: () =>
        Bodies.circle(
          anchor.x + 130,
          anchor.y,
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
  //Level five ------------
  {
    quad: {
      body: () =>
        Quad(anchor.x + 92, anchor.y - 40, 70, 120, {
          label: "quad1",
          mass: 50,
          restitution: 0.99,
          friction: 0.003,
          isStatic: true,
          angle: 1.5 * Math.PI,
          render: {
            fillStyle: "#fbd277",
          },
        }),
      constraint: () => [],
    },
    quad2: {
      body: () =>
        Quad(anchor.x + 110, anchor.y + 60, 70, 120, {
          label: "quad2",
          mass: 50,
          restitution: 0.99,
          friction: 0.003,
          isStatic: true,
          angle: Math.PI / 2,
          render: {
            fillStyle: "#001b65",
          },
        }),
      constraint: () => [],
    },
    quad3: {
      body: () =>
        Quad(anchor.x - 30, anchor.y + 150, 70, 120, {
          label: "quad3",
          mass: 50,
          restitution: 0.99,
          friction: 0.003,
          isStatic: true,
          angle: (3 * Math.PI) / 2,
          render: {
            fillStyle: "#001b65",
          },
        }),
      constraint: () => [],
    },
    quad4: {
      body: () =>
        Quad(anchor.x - 12, anchor.y + 250, 70, 120, {
          label: "quad4",
          mass: 50,
          restitution: 0.99,
          friction: 0.003,
          isStatic: true,
          angle: Math.PI / 2,
          render: {
            fillStyle: "#fbd277",
          },
        }),
      constraint: () => [],
    },

    goal: {
      body: () =>
        Bodies.circle(
          anchor.x - 90,
          anchor.y - 30,
          player.radius,
          {
            label: "goal",
            mass: 5,
            restitution: 0.9,
            friction: 0.01,
            frictionAir: 0.015,
            isSensor: true,
            render: {
              fillStyle: "#fbd277",
            },
          },
          30
        ),
      constraint: () => [],
    },

    player: {
      label: "Player",
      body: () =>
        Bodies.circle(
          anchor.x + 170,
          anchor.y + 250,
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
