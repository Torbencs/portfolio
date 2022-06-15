import React, { useEffect, useState } from "react";
import axios from "axios";

//Css
import "./QuizImage.sass";

const QuizImage = ({ handleScore, title, handleLoading, onCorrectAnswer }) => {
  const [pressed, setPressed] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [posterData, setPosterData] = useState(null);

  useEffect(() => {
    handleScore((prev) => prev - 0.04);
  }, [moveCount]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://imdb-api.com/en/API/Posters/k_bzwgpl46/${title}`,
    };

    axios
      .request(options)
      .then(function (response) {
        setPosterData(response.data.posters[0].link);
      })
      .catch(function (error) {
        console.error(error);
      });

    //Bring mask back when next image is loaded
    reset();
  }, [title]);

  const unMask = (event) => {
    event.preventDefault();
    let upX = event.clientX;
    let upY = event.clientY;

    let offset = document.getElementById("quiz__image").getBoundingClientRect();

    let mask = document.getElementById("mask1");

    let circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", upX - offset.left);
    circle.setAttribute("cy", upY - offset.top);
    circle.setAttribute("r", "12");
    circle.setAttribute("fill", "white");

    mask.appendChild(circle);
  };

  const reset = () => {
    let mask = document.getElementById("mask1");

    while (mask.firstChild) {
      mask.removeChild(mask.firstChild);
    }
  };

  const CorrectAnimation = () => (
    <svg
      className="checkmark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle
        className="checkmark__circle"
        cx="26"
        cy="26"
        r="25"
        fill="none"
      />
      <path
        className="checkmark__check"
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>
  );

  const handleMouseDown = (event) => {
    setPressed(true);
    setMoveCount((prevCount) => prevCount + 1);
    unMask(event);
  };
  const handleMove = (event) => {
    pressed && setMoveCount((prevCount) => prevCount + 1);
    if (pressed && moveCount % 2 == 0) {
      unMask(event);
    }
  };
  return (
    <div id="quiz__image__wrapper">
      {onCorrectAnswer && <CorrectAnimation />}
      <svg
        id="quiz__svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        onMouseDown={handleMouseDown}
        onMouseUp={(e) => setPressed(false)}
        onMouseMove={handleMove}
      >
        <image
          id="quiz__image"
          className="quiz__image quiz__image--blur"
          xlinkHref={posterData}
        ></image>
        <filter id="filter2" width="100%" height="100%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <mask id="mask1"></mask>
        <image
          className="quiz__image"
          xlinkHref={posterData}
          mask="url(#mask1)"
        ></image>
      </svg>
    </div>
  );
};

export default QuizImage;
