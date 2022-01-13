import React, { useEffect, useState } from "react";
import axios from "axios";

//Components
import QuizImage from "./components/QuizImage/QuizImage";
import QuizButtons from "./components/QuizButtons/QuizButtons";
//Css
import "./MovieQuiz.sass";
//Images
import MovieQuizLogo from "./assets/logo.png";

const MovieQuiz = () => {
  const [score, setScore] = useState(1001);
  const [loading, setLoading] = useState(true);
  const [movieResults, setMovieResults] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(0);

  useEffect(() => {
    let options = {
      method: "GET",
      url: "https://movies-tvshows-data-imdb.p.rapidapi.com/",
      params: { type: "get-popular-movies", page: "1", year: "2019" },
      headers: {
        "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
        "x-rapidapi-key": "f586acb3f2msh3c251997a0eed75p1e62a8jsn022c62e388a7",
      },
    };

    const nextMovie = () => {
      setCurrentMovie(currentMovie + 1);
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
    <div className="quiz__container">
      <img className="quiz__logo" src={MovieQuizLogo} />
      {!loading && (
        <QuizImage
          id={movieResults[currentMovie]}
          handleScore={setScore}
          handleLoading={setLoading}
        />
      )}
      <div className="quiz__score">
        <h2>
          Score <br></br>
          <span className="quiz__score--yellow">{Math.floor(score)}</span>
        </h2>
      </div>
      {!loading && (
        <QuizButtons
          titles={movieResults}
          correctTitle={movieResults[currentMovie]}
        />
      )}
    </div>
  );
};
export default MovieQuiz;
