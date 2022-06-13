import React from "react";
import MovieQuiz from "../../portfolioComponents/MovieQuiz/MovieQuiz";
const webData = [
  {
    title: "Physics Puzzle Game",
    tech: "React, MatterJS, UI",
    text: "A project I built with the intention of creating the 'easiest way to provide anonymous feedback'. It uses QR codes which can be placed in physical locations to give easy feedback on topics set by managers.",
    images: ["web/inspect/inspect_1.jpg"],
    isApp: true,
    link: "/play",
    bgColor: "#f8f8f8",
  },
  {
    title: "Movie Quiz Game",
    tech: "REST API, React, Adobe XD",
    text: "A small interactive game built with React where players try to guess the title by slowly revealing the movie poster. I made this over a weekend to practice building interactive React components with seperate API calls. ",
    isApp: true,
    component: <MovieQuiz />,
    bgColor: "#f8f8f8",
  },
  {
    title: "Anonymouse Feedback App",
    tech: "React, QR Codes, UI",
    text: "A project I built with the intention of creating the 'easiest way to provide anonymous feedback'. It uses QR codes which can be placed in physical locations to give easy feedback on topics set by managers.",
    images: ["web/inspect/inspect_1.jpg"],
    isApp: true,
    link: "/sayit/new",
    bgColor: "#f8f8f8",
  },

  {
    title: "Real Estate Image",
    tech: "Wordpress, SEO, JS",
    text: "A simple website for a Melbourne based business specialising in real estate photography and videography.",
    images: ["web/rei/rei_1.jpg", "web/rei/rei_2.jpg", "web/rei/rei_3.jpg"],
    bgColor: "#f8f8f8",
  },
  {
    title: "Low Poly Snowboard Game",
    tech: "Babylon.js, Blender 3D, JS",
    text: "A low poly jumping game made with BabylonJS. The game assets were modelled and animated in Blender. Click to jump!",
    isApp: true,
    component: (
      <iframe
        src="https://torbencs.github.io/portfolio/snowboard/game.html"
        scrolling="no"
      ></iframe>
    ),
    bgColor: "#f8f8f8",
  },

  {
    title: "A Tree",
    tech: "Adobe XD, Squarespace",
    text: "text",
    images: ["web/atree/atree.png"],
    bgColor: "#f8f8f8",
  },
  {
    title: "Inspection Reporting App",
    tech: "HTML, Javascript, CSS",
    text: "text",
    images: ["web/inspect/inspect_1.jpg", "web/inspect/inspect_2.jpg"],
    bgColor: "#f8f8f8",
  },
  {
    title: "SJM Design",
    tech: "HTML, CSS, JS",
    text: "A portfolio website for Sarah Jane whose work includes garments with built in sensors, QR codes, and other tech elements. I wanted the website to reflect the clothing and include dark and dystopian themes.",
    images: [
      "web/sjm/sjm_1.png",
      "web/sjm/sjm_2.png",
      "web/sjm/sjm_3.png",
      "web/sjm/sjm_4.png",
    ],
    bgColor: "#f8f8f8",
  },
];
export default webData;
