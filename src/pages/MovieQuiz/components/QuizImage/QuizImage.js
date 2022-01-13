import React, { useEffect, useState } from "react";
import axios from "axios";

//Css
import "./QuizImage.sass";

const QuizImage = ({ handleScore, id, handleLoading }) => {
  const [pressed, setPressed] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [posterData, setPosterData] = useState(null);

  useEffect(() => {
    handleScore((prev) => prev - 0.4);
  }, [moveCount]);

  useEffect(() => {
    let options = {
      method: "GET",
      url: "https://movies-tvshows-data-imdb.p.rapidapi.com/",
      params: { type: "get-movies-images-by-imdb", imdb: id.imdb_id },
      headers: {
        "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
        "x-rapidapi-key": "f586acb3f2msh3c251997a0eed75p1e62a8jsn022c62e388a7",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setPosterData(response.data.poster);
        handleLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [id]);

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
        <filter id="filter2">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <mask id="mask1">
          <circle
            cx="-50%"
            cy="-50%"
            r="0"
            fill="white"
            filter="url(#filter2)"
          />
        </mask>
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
