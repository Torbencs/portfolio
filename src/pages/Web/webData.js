import React from "react";
import MovieQuiz from "../MovieQuiz/MovieQuiz";
const webData = [
  {
    title: "Movie Quiz Game",
    tech: "REST API, React, Adobe XD",
    text: "text",
    isApp: true,
    component: <MovieQuiz />,
    bgColor: "#EEEFF1",
  },
  {
    title: "Inspection Reporting App",
    tech: "HTML, Javascript, CSS",
    text: "text",
    images: ["web/inspect/inspect_1.jpg", "web/inspect/inspect_2.jpg"],
    bgColor: "#EEEFF1",
  },
  {
    title: "Real Estate Image",
    tech: "Wordpress, SEO, JS",
    text: "text",
    images: ["web/rei/rei_1.jpg", "web/rei/rei_2.jpg", "web/rei/rei_3.jpg"],
    bgColor: "#EEEFF1",
  },
  {
    title: "Low Poly Game",
    tech: "Babylon.js, Blender 3D, JS",
    text: "text",
    isApp: true,
    component: (
      <iframe
        src="https://torbencs.github.io/portfolio/snowboard/game.html"
        scrolling="no"
      ></iframe>
    ),
    bgColor: "#EEEFF1",
  },
  {
    title: "SJM Design",
    tech: "HTML, CSS, JS",
    text: "text",
    images: [
      "web/sjm/sjm_1.png",
      "web/sjm/sjm_2.png",
      "web/sjm/sjm_3.png",
      "web/sjm/sjm_4.png",
    ],
    bgColor: "#EEEFF1",
  },
  {
    title: "A Tree",
    tech: "Adobe XD, Squarespace",
    text: "text",
    images: ["web/atree/atree.png"],
    bgColor: "#EEEFF1",
  },
];
export default webData;
