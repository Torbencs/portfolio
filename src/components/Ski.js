import { use } from "matter-js";
import { animate } from "motion";
import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

///IMPORTANT
//Need to remove game and cleanup when user navigates away from page. Currently it still plays in background and then redirects user to end page
//Css

const Ski = (props) => {
  const history = useHistory();
  let gameOver,
    gameStarted = false;
  useEffect(() => {
    //World object
    const world = {
      canvas: document.getElementById("play__canvas"),
      time: new Date(),
      boundaries: {
        left: 0,
        right: null,
      },
      step: function () {
        //Update elapsed time
        world.elapsedTime = new Date() - world.time;

        //Generate new tree obstacles
        console.log(Math.floor(Math.random() * 10));
        //trees.push(tree());

        //Move side boundaries closer together over time
        // world.boundaries.left += 0.1;
        // world.boundaries.right -= 0.1;
      },
      clear: function () {
        //Clear previous screen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
      draw: function () {
        //Draw left side boundary
        this.ctx.fillStyle = "#fff";
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(this.boundaries.left, 0);
        this.ctx.lineTo(this.boundaries.left, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height);
        this.ctx.fill();
        //Right boundry
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width, 0);
        this.ctx.lineTo(this.boundaries.right, 0);
        this.ctx.lineTo(this.boundaries.right, this.canvas.height);
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.fill();
      },
    };

    //Get context
    world.ctx = world.canvas.getContext("2d");
    //Hide mouse when over canvas
    world.canvas.style.cursor = "none";
    world.position = world.canvas.parentNode.getBoundingClientRect();
    //Set canvas size equal to parent bounding size
    world.canvas.width = world.position.width;
    //Set player right wall boundary to width
    world.boundaries.right = world.canvas.width;
    //Window height minus the white border in app.sass
    world.canvas.height = window.innerHeight - 80;

    //Player movement
    // -- Keyboard Controls
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key == " " || e.key == "Spacebar") {
          player.spacePressed = true;
        }
        if (e.key == "Left" || e.key == "ArrowLeft") {
          player.leftPressed = true;
        }
        if (e.key == "Right" || e.key == "ArrowRight") {
          player.rightPressed = true;
        }
      },
      false
    );
    document.addEventListener(
      "keyup",
      (e) => {
        if (e.key == "Left" || e.key == "ArrowLeft") {
          player.leftPressed = false;
        }
        if (e.key == "Right" || e.key == "ArrowRight") {
          player.rightPressed = false;
        }
        if (e.key == " " || e.key == "Spacebar") {
          player.spacePressed = false;
        }
      },
      false
    );

    //Object arrays
    const trees = [];
    const circles = [];

    const player = {
      y: world.position.height / 3,
      x: world.position.width / 2,
      width: 10,
      height: 10,
      radius: 7,
      maxSpeed: 4.5,
      friction: 0.92,
      velocityX: 0,
      velocityY: 5,
      leftPressed: false,
      rightPressed: false,
      spacePressed: false,
      color: "#f3c41a",
      score: 0,
      points: [{ x: world.position.width / 2, y: world.position.height / 3 }],

      step: function () {
        //Movement
        if (this.rightPressed) {
          this.velocityX += 0.3 + 0.04 * this.velocityX;
        }
        if (this.leftPressed) {
          this.velocityX -= 0.3 - 0.04 * this.velocityX;
        }

        this.velocityX *= this.friction;
        this.x += this.velocityX;

        //Constrain player to canvas boundary
        //--Right side
        if (this.x >= world.boundaries.right - player.radius) {
          this.x = world.boundaries.right - player.radius;
        }
        //--Left side
        if (this.x <= world.boundaries.left + player.radius) {
          this.x = world.boundaries.left + player.radius;
        }

        //Player tail points
        let midPointX =
          this.points[this.points.length - 1].x +
          (this.x - this.points[this.points.length - 1].x) / 2;
        let midPointY =
          this.points[this.points.length - 1].y +
          (this.y - this.points[this.points.length - 1].y) / 2;

        this.points.push({ x: midPointX, y: midPointY });
        this.points.push({ x: this.x, y: this.y });

        //Update player scores
        player.score = Math.round((world.elapsedTime /= 1000));
      },
      draw: function () {
        world.ctx.fillStyle = player.color;
        world.ctx.beginPath();
        world.ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2, true); // π * 2 Radians = 360 degrees
        world.ctx.closePath();
        world.ctx.fill();
      },
      drawTail: function () {
        for (let i = 0; i < this.points.length; i++) {
          let inverted = this.points.length - i;
          let scaled = inverted ** 1.34 * 0.01 + 3;

          world.ctx.beginPath();
          world.ctx.arc(
            this.points[i].x,
            this.points[i].y,
            scaled,
            0,
            Math.PI * 2
          );
          world.ctx.closePath();
          world.ctx.fillStyle = "#e0e0e0";
          world.ctx.fill();
        }
      },
      stepTail: function () {
        for (const property in this.points) {
          let moveDistance = player.maxSpeed - Math.abs(player.velocityX * 0.2);
          if (moveDistance < 0) {
            moveDistance = 0;
          }
          this.points[property]["y"] -= moveDistance; //Speed of trees
          //If trees are out of screen remove them
          this.points[property]["y"] < -50 && this.points.splice(property, 1);
        }
      },
      drawShadow: function () {
        world.ctx.beginPath();
        world.ctx.ellipse(
          player.x + 5,
          player.y + 1,
          player.radius - 2,
          player.radius + 3,
          Math.PI / 2.5,
          0,
          2 * Math.PI
        );
        world.ctx.closePath();
        world.ctx.fillStyle = "#e5e8e8";
        world.ctx.fill();
      },
    };

    //Tree factory fn
    const tree = () => {
      let width = randomNum(25, 40);
      let height = width * 2.3;
      let startX = randomNum(
        world.boundaries.left + 50,
        world.boundaries.right - 50
      );
      let startY = world.position.height + 100;
      return {
        //Generate random starting X pos between canvas sides
        points: {
          1: { x: startX, y: startY },
          2: { x: startX + width / 2, y: startY + height },
          3: { x: startX - width / 2, y: startY + height },
        },
        pointsShadow: {
          1: { x: startX, y: startY + height * 0.8 },
          2: { x: startX + width * 2, y: startY + height * 0.8 },
          3: { x: startX + width / 2, y: startY + height },
        },
        step: function () {
          if (this.points[2].y < -10) {
            return;
          }
          for (const property in this.points) {
            //If the player is moving sideways slow the trees down
            let moveDistance =
              player.maxSpeed - Math.abs(player.velocityX * 0.2);
            if (moveDistance < 0) {
              moveDistance = 0;
            }
            this.points[property]["y"] -= moveDistance;
            this.pointsShadow[property]["y"] -= moveDistance;
          }
        },
        draw: function () {
          if (this.points[2].y < -10) {
            return;
          }
          //Draw shadow
          world.ctx.fillStyle = "#e0e4e4";
          world.ctx.beginPath();
          world.ctx.moveTo(
            this.pointsShadow[1]["x"],
            this.pointsShadow[1]["y"]
          );
          world.ctx.lineTo(
            this.pointsShadow[2]["x"],
            this.pointsShadow[2]["y"]
          );
          world.ctx.lineTo(
            this.pointsShadow[3]["x"],
            this.pointsShadow[3]["y"]
          );
          world.ctx.lineTo(this.pointsShadow[1]["x"], this.points[1]["y"]);
          world.ctx.fill();

          //Draw tree
          world.ctx.fillStyle = "#274f45";
          world.ctx.beginPath();
          world.ctx.moveTo(this.points[1]["x"], this.points[1]["y"]);
          world.ctx.lineTo(this.points[2]["x"], this.points[2]["y"]);
          world.ctx.lineTo(this.points[3]["x"], this.points[3]["y"]);
          world.ctx.lineTo(this.points[1]["x"], this.points[1]["y"]);
          world.ctx.fill();
        },
      };
    };

    function drawScore() {
      world.ctx.font = "800 76px Poppins";
      world.ctx.fillStyle = "#2f2042";
      world.ctx.fillText(`${player.score}`, world.position.width / 2 - 20, 100);
    }

    //Helper random function
    function randomNum(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function lineCircleIntersect(A, B, C, radius) {
      let dist;
      const v1x = B.x - A.x;
      const v1y = B.y - A.y;
      const v2x = C.x - A.x;
      const v2y = C.y - A.y;
      // get the unit distance along the line of the closest point to
      // circle center
      const u = (v2x * v1x + v2y * v1y) / (v1y * v1y + v1x * v1x);

      // if the point is on the line segment get the distance squared
      // from that point to the circle center
      if (u >= 0 && u <= 1) {
        dist = (A.x + v1x * u - C.x) ** 2 + (A.y + v1y * u - C.y) ** 2;
      } else {
        // if closest point not on the line segment
        // use the unit distance to determine which end is closest
        // and get dist square to circle
        dist =
          u < 0
            ? (A.x - C.x) ** 2 + (A.y - C.y) ** 2
            : (B.x - C.x) ** 2 + (B.y - C.y) ** 2;
      }
      return dist < radius * radius;
    }

    function circleIntersect(x1, y1, r1, x2, y2, r2) {
      // Calculate the distance between the two circles
      let squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

      // When the distance is smaller or equal to the sum
      // of the two radius, the circles touch or overlap
      return squareDistance <= (r1 + r2) * (r1 + r2);
    }

    // update function, to update positions
    function update() {
      world.step();
      player.step();
      //This should be a step method on the boxes class
      trees.forEach((el, i) => {
        //Remove trees outside the canvas top edge
        //el.points[2].y < -50 && trees.splice(i, 1);
        el.step();

        //Check collision with trees
        //Need to fix this. Right now it doesn't check the last line of the square
        //because the for loop can't loop back to the start of the obj to get point 1
        for (let i = 1; i < 3; i++) {
          lineCircleIntersect(
            el.points[i],
            el.points[i + 1],
            player,
            player.radius
          ) && (gameOver = true);
          //collisionDetect(el, player) && (gameOver = true);
        }
      });
      player.stepTail();
    }

    // render function draws everything on to canvas
    function render() {
      //Clear previous screen
      world.clear();

      //Render objects in array
      player.drawShadow();
      trees.forEach((el) => el.draw());
      player.drawTail();
      //Draw player shadow
      player.draw();

      //Draw world boundaries
      world.draw();

      drawScore(player.score);
    }

    // gameLoop
    function gameLoop() {
      if (!gameStarted) {
        gameStarted = true;
      } else {
        update();
        render();
      }
    }
    function step() {
      if (!gameOver) {
        gameLoop();
        window.requestAnimationFrame(step);
      } else if (gameOver) {
        history.replace({
          pathname: "/score",
          state: { score: player.score },
        });
      }
    }
    //First run of game loop
    window.requestAnimationFrame(step);
  }, []);

  return <canvas id={"play__canvas"}></canvas>;
};

export default Ski;
