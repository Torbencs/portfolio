import React, { useEffect, useState } from "react";
import axios from "axios";
import { isMobile } from "react-device-detect";
import { shuffle } from "../../helpers/shuffle";

//Components
import QuizImage from "./components/QuizImage/QuizImage";
import QuizButtons from "./components/QuizButtons/QuizButtons";
//Css
import "./MovieQuiz.sass";
import "./components/QuizButtons/QuizButtons.sass";
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

    const getPopularMovies = async () => {
      const options = {
        method: "GET",
        url: "https://imdb8.p.rapidapi.com/title/get-most-popular-movies",
        params: {
          homeCountry: "US",
          currentCountry: "US",
          purchaseCountry: "US",
        },
        headers: {
          "X-RapidAPI-Key":
            "f586acb3f2msh3c251997a0eed75p1e62a8jsn022c62e388a7",
          "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const titleList = shuffle(response.data).slice(0, 10);

        const movieDetails = [];
        for (const title of titleList) {
          const info = await getMovieInfo(title);
          movieDetails.push(info);
        }

        setMovieResults(movieDetails);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    const getMovieInfo = async (title) => {
      const tt = title.split("/")[2];
      const options = {
        method: "GET",
        url: "https://imdb8.p.rapidapi.com/title/get-details",
        params: {
          tconst: tt,
        },
        headers: {
          "X-RapidAPI-Key":
            "f586acb3f2msh3c251997a0eed75p1e62a8jsn022c62e388a7",
          "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
    getPopularMovies();
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

      //Reduce score by 5
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
          <p>Be careful, the more you swipe the lower your score will be!</p>
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

      <div
        className={`quiz__container ${isActive && "quiz__container--active"}`}
      >
        <img
          className={`quiz__bg ${isActive && "quiz__bg--hide"}`}
          src={MovieQuizLogo}
          alt="Movie Quiz Logo"
        />
        {loading ? (
          <button className="btn--loading">Loading..</button>
        ) : (
          !isActive && (
            <button className="btn" onClick={() => setIsActive(true)}>
              Start
            </button>
          )
        )}

        {/* Instruction overlay */}
        {isActive && showOverlay && <Popup type={showOverlay} />}

        {!loading && isActive && (
          <>
            <img className="quiz__logo" src={MovieQuizLogoSmall} />
            <QuizImage
              image={movieResults[currentMovie].image.url}
              handleScore={setScore}
              handleLoading={setLoading}
              onCorrectAnswer={correctAnimation}
            />

            <div id="score" className="quiz__score">
              <div
                className="quiz__score--value"
                style={{ width: `${score}%` }}
              ></div>
            </div>

            <QuizButtons
              movies={movieResults}
              correctTitle={movieResults[currentMovie].title}
              handleClick={handleChoice}
            />
          </>
        )}
      </div>
    </>
  );
};
export default MovieQuiz;
