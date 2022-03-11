import React, { useEffect, useState } from "react";

//Css
import "./QuizButtons.sass";

const QuizButtons = ({ titles, correctTitle, handleClick }) => {
  const [shuffledTitles, setShuffledTitles] = useState([]);

  useEffect(() => {
    //Shuffles the movie titles
    //Add the correct title as the first element in the array
    setShuffledTitles((oldArray) => [correctTitle]);
    //Loop 4 times adding a random title to end of array each time
    for (let i = 0; i < 3; i++) {
      let randomTitle = titles[Math.floor(Math.random() * titles.length)];
      //If the random title is the same as the correct title break one iteration of loop and pick another title to avoid duplicate
      if (randomTitle == correctTitle) {
        i -= 1;
        continue;
      }
      setShuffledTitles((oldArray) => [...oldArray, randomTitle]);
    }
    //Shuffle the array so the first item isn't always the correct title
    setShuffledTitles((oldArray) => oldArray.sort(() => Math.random() - 0.5));
  }, [correctTitle]);

  return (
    <div id="quiz__button__container">
      {shuffledTitles.map((item, i) => (
        <button
          href="javascript:void(0);"
          key={i}
          className="quiz__buttons btn "
          onClick={() => handleClick(item.title)}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};
export default QuizButtons;
