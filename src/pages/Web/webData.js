import React from "react";
import MovieQuiz from "../../portfolioComponents/MovieQuiz/MovieQuiz";
const webData = [
  {
    title: "Feedback App",
    tech: "React, QR Codes, UI",
    text: "MVP of a front end for a feedback app I built with the intention of creating the 'easiest way to provide anonymous feedback'. It uses QR codes which can be placed in physical locations to give easy feedback on topics set by managers.",
    images: [
      "web/sayit/frontend_thumbnail.jpg",
      "web/sayit/dashboard_thumbnail.jpg",
    ],
    isApp: true,
    link: ["/demo", "/sayit/new"],
    bgColor: "#f8f8f8",
  },
  {
    title: "Physics Puzzle Game",
    tech: "React, MatterJS, UI",
    text: "A physics puzzle game built with React, Javascript, and a little help from MatterJS.",
    images: ["play/eclipse_logo_med.png"],
    isApp: true,
    link: ["/play"],
    bgColor: "#f8f8f8",
  },
  {
    title: "Movie Quiz Game",
    tech: "REST API, React, Adobe XD",
    text: "A small interactive game built with React where players try to guess the title by slowly revealing the movie poster. I made this over a weekend to practice building interactive React components with seperate API calls. ",
    isApp: true,
    link: false,
    component: <MovieQuiz />,
    bgColor: "#f8f8f8",
  },
  {
    title: "Real Estate Image",
    tech: "Figma, Wordpress, SEO, JS",
    text: "A simple website for a Melbourne based business specialising in real estate photography and videography. Designed in Figma and built on Wordpress",
    images: ["web/rei/rei_1.jpg", "web/rei/rei_2.jpg", "web/rei/rei_3.jpg"],
    link: false,
    bgColor: "#f8f8f8",
  },
  {
    title: "Low Poly Snowboard Game",
    tech: "Babylon.js, Blender 3D, JS",
    text: "A low poly jumping game made with BabylonJS. The game assets were modelled and animated in Blender. Click to jump!",
    isApp: true,
    link: false,
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
    text: "The aTree project was launched in 2019 by Cassinia Environmental, a profit-for-purpose organisation dedicated to reconnecting, restoring, and protecting Australian natural systems. Designed in Figma and built with Squarespace. ",
    images: ["web/atree/atree.png"],
    link: false,
    bgColor: "#f8f8f8",
  },
  {
    title: "Inspection Reporting App",
    tech: "HTML, Javascript, CSS",
    text: "A simple form based App for monitoring and updating inspection repeorts. Built with good ol' HTML, and CSS",
    images: ["web/inspect/inspect_1.jpg", "web/inspect/inspect_2.jpg"],
    link: false,
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
    link: false,
    bgColor: "#f8f8f8",
  },
];
export default webData;
