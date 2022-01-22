import { use } from "matter-js";
import { animate } from "motion";
import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

//Css

const Play = (props) => {
  const history = useHistory();
  let gameOver,
    gameStarted = false;
  useEffect(() => {
    const canvas = document.getElementById("play__canvas");
    //Hide mouse when over canvas
    //canvas.style.cursor = "none";
    const canvasRect = canvas.parentNode.getBoundingClientRect();

    canvas.width = canvasRect.width;
    //Window height minus the white border in app.sass
    canvas.height = window.innerHeight - 80;

    const ctx = canvas.getContext("2d");

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
    const boxes = [];
    const circles = [];

    const player = {
      y: canvas.getBoundingClientRect().bottom - 90,
      x: canvas.width / 2,
      width: 100,
      height: 100,
      radius: 50,
      speed: 20,
      friction: 0.85,
      velocityY: 0,
      leftPressed: false,
      rightPressed: false,
      spacePressed: false,
      color: "#f3c41a",
      score: 0,
      grow: function () {
        this.radius += 9;
        this.y -= 9;
      },
      shrink: function () {
        this.radius < 10 && (gameOver = true);
        this.radius -= 0.05;
        this.y += 0.05;
      },
      jump: function () {
        console.log(this.y);
      },
      move: function () {
        this.spacePressed && player.jump();

        if (this.rightPressed && this.velocityY < this.speed) {
          this.velocityY += 2;
        }
        if (this.leftPressed && this.velocityY > -this.speed) {
          this.velocityY -= 2;
        }

        this.velocityY *= this.friction;
        this.x += this.velocityY;

        //Constrain player to canvas boundary
        //--Right side
        if (this.x >= canvasRect.width - player.radius) {
          this.x = canvasRect.width - player.radius;
          this.velocityY = 0;
        }
        //--Left side
        if (this.x <= player.radius) {
          this.velocityY = 0;
          this.x = player.radius;
        }

        //Shrink if player is moving
        Math.abs(this.velocityY) > 1 && player.shrink();
      },
    };

    //Box factory fn
    const box = () => {
      let size = randomNum(20, 90);
      let startX = randomNum(canvasRect.left, canvas.width - canvasRect.left);
      return {
        //Generate random starting X pos between canvas sides
        x: startX,
        y: -100,
        points: {
          1: { x: startX, y: -100 },
          2: { x: startX + size, y: -100 },
          3: { x: startX + size, y: -100 + size },
          4: { x: startX, y: -100 + size },
        },
        speed: randomNum(2, 7),
        width: size,
        height: size,
        rotation: (Math.random() - 0.5) * 4,
        step: function () {
          for (const property in this.points) {
            this.points[property]["y"] += this.speed;
          }
          this.y += this.speed;
          /* for (const property in this.points) {
            this.points[property]["x"] += this.speed;
          } */

          rotate(this.points, this.rotation);
        },
        draw: function () {
          //ctx.fillRect(this.x, this.y, this.width, this.height);
          ctx.fillStyle = "#2f2042";
          ctx.beginPath();
          ctx.moveTo(this.points[1]["x"], this.points[1]["y"]);
          ctx.lineTo(this.points[2]["x"], this.points[2]["y"]);
          ctx.lineTo(this.points[3]["x"], this.points[3]["y"]);
          ctx.lineTo(this.points[4]["x"], this.points[4]["y"]);
          ctx.lineTo(this.points[1]["x"], this.points[1]["y"]);
          ctx.fill();

          ctx.fillStyle = "red";
          ctx.fillRect(this.cx, this.cy, 2, 2);
        },
      };
    };

    //Box factory fn
    const circle = () => {
      let startX = randomNum(canvasRect.left, canvas.width - canvasRect.left);
      return {
        //Generate random starting X pos between canvas sides
        x: startX,
        y: -100,
        width: 20,
        height: 20,
        radius: 15,
        speed: randomNum(2, 7),
        step: function () {
          this.y = this.y + this.speed;
          this.x = this.x - (startX - canvas.width / 2) * 0.002;
        },
        draw: function () {
          ctx.fillStyle = "#f3c41a";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true); // π * 2 Radians = 360 degrees
          ctx.closePath();
          ctx.fill();
        },
      };
    };
    const ObjSpawner = () => {
      let boxInterval,
        circleInterval,
        numBoxes = 1;
      return {
        start: function () {
          boxInterval = setInterval(() => {
            numBoxes += 0.008;
            for (let i = 1; i <= Math.floor(numBoxes); i++) {
              boxes.push(box());
            }
          }, 500);

          circleInterval = setInterval(() => {
            circles.push(circle());
          }, 6000);
        },
        reset: function () {
          this.startTime = new Date();
        },
        stop: () => {
          clearInterval(circleInterval);
          clearInterval(boxInterval);
        },
      };
    };
    const spawnObjects = ObjSpawner();

    // function to draw ball
    function drawBall(x, y, radius, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      // syntax --> arc(x, y, radius, startAngle, endAngle, antiClockwise_or_not)
      ctx.arc(x, y, radius, 0, Math.PI * 2, true); // π * 2 Radians = 360 degrees
      ctx.closePath();
      ctx.fill();
    }
    function drawScore() {
      ctx.font = "800 76px Poppins";
      ctx.fillStyle = "#2f2042";
      ctx.fillText(`${player.score}`, canvas.width / 2 - 20, 130);
    }

    // reset the ball
    function reset() {}

    //Helper random function
    function randomNum(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    function rotate(points, angle) {
      var radians = (Math.PI / 180) * angle;
      let cos = Math.cos(radians);
      let sin = Math.sin(radians);

      //Find centers
      let cx = points[1]["x"] + (points[3]["x"] - points[1]["x"]) / 2;
      let cy = points[1]["y"] + (points[3]["y"] - points[1]["y"]) / 2;

      for (const property in points) {
        points[property]["x"] =
          cos * (points[property]["x"] - cx) +
          sin * (points[property]["y"] - cy) +
          cx;
        points[property]["y"] =
          cos * (points[property]["y"] - cy) -
          sin * (points[property]["x"] - cx) +
          cy;
      }
    }

    function lineCircleIntersect(A, B, C, radius) {
      var dist;
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
      player.move();
      boxes.forEach((el, i) => {
        el.step();
        el.y > canvas.height && boxes.splice(i, 1);

        //Check collision with boxes
        //Need to fix this. Right now it doesn't check the last line of the square
        //because the for loop can't loop back to the start of the obj to get point 1
        for (let i = 1; i < 4; i++) {
          lineCircleIntersect(
            el.points[i],
            el.points[i + 1],
            player,
            player.radius
          ) && (gameOver = true);
          //collisionDetect(el, player) && (gameOver = true);
        }
      });
      circles.forEach((el, i) => {
        el.step();
        el.y > canvas.height && circles.splice(i, 1);
        //Check collision with health circle
        if (
          circleIntersect(
            el.x,
            el.y,
            el.radius,
            player.x,
            player.y,
            player.radius
          )
        ) {
          //Make the player bigger
          player.grow();
          //Add to score
          player.score++;
          //Remove circle from array
          circles.splice(i, 1);
        }
      });
    }

    // render function draws everything on to canvas
    function render() {
      //Clear previous screen
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //Render objects in array
      boxes.forEach((el) => el.draw());
      circles.forEach((el) => el.draw());
      //Draw player ball
      drawBall(player.x, player.y, player.radius, player.color);
      drawScore(player.score);
    }

    // gameLoop
    function gameLoop() {
      if (!gameStarted) {
        spawnObjects.start();
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
        spawnObjects.stop();
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

export default Play;
