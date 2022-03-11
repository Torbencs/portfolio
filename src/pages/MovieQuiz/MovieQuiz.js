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

  useEffect(() => {
    setLoading(true);
    let options = {
      method: "GET",
      url: "https://movies-tvshows-data-imdb.p.rapidapi.com/",
      params: { type: "get-popular-movies", page: "1", year: "2019" },
      headers: {
        "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
        "x-rapidapi-key": "f586acb3f2msh3c251997a0eed75p1e62a8jsn022c62e388a7",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMovieResults(response.data.movie_results);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

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
              id={movieResults[currentMovie]}
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
