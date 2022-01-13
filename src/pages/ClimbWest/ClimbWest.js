import React, { useState } from "react";
import "../ClimbWest/ClimbWest.sass";

//Component
import Gallery from "../../components/Gallery/Gallery";
import img from "./assets/climbwestwoman.png";

let data = [
  {
    title: "ClimbWest",
    text: "text",
    imgSrc: "climbwestwoman.png",
    bgColor: "#EEEFF1",
    theme: "dark",
  },
  {
    title: "ClimbWest",
    text: "New text",
    imgSrc: "pride.png",
    bgColor: "#1F1F31",
    textTheme: "light",
  },
];

const ClimbWest = () => {
  const [currentPosition, setCurrentPosition] = useState(0);

  return (
    <Gallery
      title={data[currentPosition].title}
      text={data[currentPosition].text}
      img={data[currentPosition].imgSrc}
      bgColor={data[currentPosition].bgColor}
      textTheme={data[currentPosition].textTheme}
      handleNext={() => setCurrentPosition(currentPosition + 1)}
    />
  );
};

export default ClimbWest;
