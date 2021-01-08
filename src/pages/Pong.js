import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

//Css
import "../css/layout.sass";
import "../css/play.sass";

const Pong = (props) => {
  useEffect(() => {
    props.currentPage("work");

    //Hide normal navigation section
    document.getElementById("navWrapper").style.display = "none";
    // grab a reference of our "canvas" using its id
    const canvas = document.getElementById("canvas");

    /* get a "context". Without "context", we can't draw on canvas */
    const ctx = canvas.getContext("2d");

    //Get reference to UI shapes
    const square = document.getElementById("square");
    const triangle = document.getElementById("triangle");
    const circle = document.getElementById("circle");
    circle.classList.add("notransition");

    //Move UI elements to edge of page to make room for content

    //-- Square

    square.style.top = 50 + "%";
    square.style.right = 5 + "%";
    //-- Triangle

    triangle.style.bottom = 50 + "%";
    triangle.style.left = 6 + "%";
    triangle.style.transform = "rotate(45deg)";

    //Add event listener to remove transition from shapes after they have finished animating
    //-- For some reason this only works with three individual event listener functions.

    //Triangle UI
    triangle.addEventListener("transitionend", () => {
      triangle.classList.add("notransition");
      ai.y = triangle.getBoundingClientRect().y;
    });
    triangle.addEventListener("webkitTransitionEnd", () => {
      triangle.classList.add("notransition");
      ai.y = triangle.getBoundingClientRect().y;
    });

    //Hide UI  circle outline
    document.getElementById("circle--outline").style.display = "none";

    //User paddle movement
    const handleMouseMove = (e) => {
      //Ensure paddles stay within the canvas
      let mouseY;
      if (e.clientY < canvas.getBoundingClientRect().y) {
        mouseY = canvas.getBoundingClientRect().y;
      } else if (
        e.clientY >
        canvas.getBoundingClientRect().bottom - paddleHeight
      ) {
        mouseY = canvas.getBoundingClientRect().bottom - paddleHeight;
      } else {
        mouseY = e.clientY;
      }
      //Set square paddle div to user input mouse Y position
      square.style.top = mouseY + "px";
      //Update paddle Y position
      user.y = square.getBoundingClientRect().y - 100;

      //Remove transition from square UI
      square.classList.add("notransition");
      square.classList.add("notransition");
    };
    window.addEventListener("mousemove", handleMouseMove);

    const input = [];
    const output = [];

    const paddleWidth = square.offsetWidth;
    const paddleHeight = square.offsetHeight;

    let gameEnd,
      gameStart = false;

    // user paddle
    const user = {
      width: paddleWidth,
      height: paddleHeight,
      color: "#FFF",
      score: 0,
    };

    const ai = {
      width: paddleWidth,
      height: paddleHeight,
      color: "#FFF",
      score: 0,
    };

    // ball
    const ball = {
      x: circle.getBoundingClientRect().x,
      y: circle.getBoundingClientRect().y,
      radius: 40,
      speed: window.innerWidth / 150,
      velocityX: window.innerWidth / -150,
      velocityY: window.innerWidth / 150,
      color: "#f3c41a",
    };

    console.log();
    //-- Hide UI Circle
    //circle.style.display = "none";

    // function to draw ball
    function drawBall(x, y, radius, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      // syntax --> arc(x, y, radius, startAngle, endAngle, antiClockwise_or_not)
      ctx.arc(x, y, radius, 0, Math.PI * 2, true); // π * 2 Radians = 360 degrees
      ctx.closePath();
      ctx.fill();
    }

    // reset the ball
    function reset() {
      // reset ball's value to older values
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.speed = 10;

      // changes the direction of ball
      ball.velocityX = -ball.velocityX;
      ball.velocityY = -ball.velocityY;

      gameEnd = true;
    }

    // Collision detection function
    function collisionDetect(player, ball) {
      // returns true or false
      player.top = player.y;
      player.right = player.x + player.width;
      player.bottom = player.y + player.height;
      player.left = player.x;

      ball.top = ball.y - ball.radius;
      ball.right = ball.x + ball.radius;
      ball.bottom = ball.y + ball.radius;
      ball.left = ball.x - ball.radius;

      return (
        ball.left < player.right &&
        ball.top < player.bottom &&
        ball.right > player.left &&
        ball.bottom > player.top
      );
    }

    // update function, to update things position
    function update() {
      // check if ball hits top or bottom wall
      if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        ball.velocityY = -ball.velocityY;
      }

      // if ball hit on right wall
      if (ball.x + ball.radius >= canvas.width) {
        // then user scored 1 point
        user.score += 1;
        reset();
      }

      // if ball hit on left wall
      if (ball.x - ball.radius <= 0) {
        // then ai scored 1 point
        ai.score += 1;
        reset();
      }

      // Add delay to new game then move the ball
      ball.x += ball.velocityX;
      ball.y += ball.velocityY;

      //User paddle movement
      user.x = square.getBoundingClientRect().x - 40;
      // ai paddle movement
      ai.x = triangle.getBoundingClientRect().x + 30;
      ai.y += (ball.y - (ai.y + ai.height / 2)) * 0.09;

      //Move AI triangle paddle
      triangle.style.top = ai.y + 100 + "px";

      // collision detection on paddles
      let player = ball.x > canvas.width / 2 ? user : ai;

      if (collisionDetect(player, ball)) {
        // default angle is 0deg in Radian
        let angle = 0;

        // if ball hit the top of paddle
        if (ball.y < player.y + player.height / 2) {
          // then -1 * Math.PI / 4 = -45deg
          angle = (-1 * Math.PI) / 4;
        } else if (ball.y > player.y + player.height / 2) {
          // if it hit the bottom of paddle
          // then angle will be Math.PI / 4 = 45deg
          angle = Math.PI / 4;
        }

        /* change velocity of ball according to on which paddle the ball hit */
        ball.velocityX =
          (player === user ? -1 : 1) * ball.speed * Math.cos(angle);
        ball.velocityY = ball.speed * Math.sin(angle);

        // increase ball speed
        ball.speed += 0.5;
      }
    }

    // render function draws everything on to canvas
    function render() {
      ctx.fillStyle = "#e2e2dd";

      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPaddle(ai.x, ai.y, ai.width, ai.height, user.color);
      drawPaddle(user.x, user.y, user.width, user.height, user.color);
      drawBall(ball.x, ball.y, ball.radius, ball.color);
    }

    function drawPaddle(x, y, width, height, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    }
    // gameLoop
    function gameLoop() {
      //Wait for circle to shrink before starting the game
      if (!gameStart) {
        render();
        //Shrink circle until it reaches the size of the game ball
        if (circle.offsetHeight > ball.radius * 2) {
          circle.style.left =
            ball.x - circle.offsetHeight / 2 + ball.radius + "px";
          circle.style.top =
            ball.y - circle.offsetHeight / 2 + ball.radius + 60 + "px";
          circle.style.height = circle.offsetHeight - 10 + "px";
          circle.style.width = circle.offsetWidth - 10 + "px";
        } else {
          //Hide UI circle and start game
          circle.style.display = "none";
          gameStart = true;
        }
      } else {
        // update() function here
        update();
        // render() function here
        render();
      }
    }
    let r = 0;
    function step() {
      gameLoop();
      if (!gameEnd) {
        document.getElementById("insert").innerHTML = `Ball (${
          Math.round((ball.x / canvas.width) * 100) / 100
        }, ${Math.round((ball.y / canvas.height) * 100) / 100}) : User (${
          Math.round((user.y / canvas.height) * 100) / 100
        }) : Steps (${r})`;
        window.requestAnimationFrame(step);

        r++;
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    window.requestAnimationFrame(step);

    //Component will unmount
    return () => {
      gameEnd = true;
      triangle.style.transform = "rotate(0deg)";

      circle.style.display = "block";
      window.removeEventListener("mousemove", handleMouseMove);

      //Show nav again
      document.getElementById("navWrapper").style.display = "block";
    };
  }, []);

  return (
    <div id={"play__wrapper"}>
      <div id={"play__header"}>
        <h1>
          <Link
            id={"home"}
            to="/portfolio"
            onClick={() => {
              props.currentHover("home");
            }}
          >
            <span id={"play__yellowDot"}>.</span>
            <span id={"play__ai"}></span>
            <span id={"insert"} style={{ fontSize: "0.5em" }}></span>
          </Link>
        </h1>
        <div className={"play__exit"}></div>
      </div>
    </div>
  );
};

export default Pong;
