import React, { useEffect, useState } from "react";
import axios from "axios";
import { isMobile } from "react-device-detect";

//Components
import QuizImage from "./components/QuizImage/QuizImage";
import QuizButtons from "./components/QuizButtons/QuizButtons";
//Css
import "./MovieQuiz.sass";
//Images
import MovieQuizLogo from "./assets/logo.png";
import MovieQuizLogoSmall from "./assets/logo_small.png";

const MovieQuiz = () => {
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(100.05);
  const [loading, setLoading] = useState(true);
  const [movieResults, setMovieResults] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(0);
  const [correctAnimation, setCorrectAnimation] = useState(false);
  const [showOverlay, setShowOverlay] = useState("instructions");

  useEffect(() => {
    setLoading(true);

    const options = {
      method: "GET",
      url: "https://imdb-api.com/en/API/MostPopularMovies/k_bzwgpl46",
    };

    axios
      .request(options)
      .then(function (response) {
        setMovieResults(response.data.items.slice(0, 10));
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleChoice = (selectedTitle) => {
    //Handle a correct choice
    if (selectedTitle === movieResults[currentMovie].title) {
      //Hide mask layer so the poster becomes visible
      document.getElementById("mask1").style.display = "none";
      //Show animation for choosing correct movie
      setCorrectAnimation(true);
      setTimeout(() => {
        //Remove correct choice animation
        setCorrectAnimation(false);
        //Move to next item in the api call
        if (currentMovie + 1 == movieResults.length) {
          setShowOverlay("ended");
        } else {
          setCurrentMovie(currentMovie + 1);
        }
        //Bring the mask back
        let mask = document.getElementById("mask1");
        if (mask) {
          mask.style.display = "block";
        }
      }, 2500);
    } else {
      //Add a css class that shakes the image giving feedback for incorrect choice
      document.getElementById("quiz__image__wrapper").classList.add("--shake");
      //Remove class after 1 second
      setTimeout(
        () =>
          document
            .getElementById("quiz__image__wrapper")
            .classList.remove("--shake"),
        1000
      );

      //Reduce score by 50
      setScore(score - 5);
    }
  };

  const Popup = ({ type }) => {
    if (type == "instructions") {
      return (
        <div className="quiz__overlay">
          <h1>Instructions</h1>
          <p>
            Use your {isMobile ? "finger" : "mouse"} to swipe away hidden parts
            of the film poster!
          </p>
          <p>Be careful, the more you swipe the lower your score will go!</p>
          <button onClick={() => setShowOverlay(false)}>Start</button>
        </div>
      );
    } else {
      return (
        <div className="quiz__overlay">
          <h1>Well done!</h1>
          <p>
            You scored{" "}
            <span className="quiz__overlay--purple">{Math.floor(score)}</span>{" "}
            out of 100!
          </p>
        </div>
      );
    }
  };

  return (
    <>
      <link rel="preload" as="image" href={MovieQuizLogo} />
      {!loading && (
        <div
          className={`quiz__container ${isActive && "quiz__container--active"}`}
        >
          <img
            className={`quiz__bg ${isActive && "quiz__bg--hide"}`}
            src={MovieQuizLogo}
            onClick={() => setIsActive(true)}
          />
          {/* Instruction overlay */}
          {isActive && showOverlay && <Popup type={showOverlay} />}
          <img className="quiz__logo" src={MovieQuizLogoSmall} />
          {isActive && (
            <QuizImage
              title={movieResults[currentMovie].id}
              handleScore={setScore}
              handleLoading={setLoading}
              onCorrectAnswer={correctAnimation}
            />
          )}
          <div id="score" className="quiz__score">
            <div
              className="quiz__score--value"
              style={{ width: `${score}%` }}
            ></div>
          </div>

          <QuizButtons
            titles={movieResults}
            correctTitle={movieResults[currentMovie]}
            handleClick={handleChoice}
          />
        </div>
      )}
    </>
  );
};
export default MovieQuiz;
