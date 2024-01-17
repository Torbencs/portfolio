import React from "react";
import MovieQuiz from "../../portfolioComponents/MovieQuiz/MovieQuiz";
const webData = [
  {
    title: "Feedback App",
    tech: "React, QR Codes, UI",
    text: "MVP of a front end and dashboard for a feedback app I built with the intention of creating the 'easiest way to provide anonymous feedback'. Managers create printable QR sticker with a question or prompt which can be scanned by a user with a smartphone to leave feedback or answer a question. The feedback is anonymous and provides a very simple way to gather feedback from your company, team, or customers. This portfolio version is just a demo and not connected to a backend",
    images: [
      "web/sayit/frontend_thumbnail.jpg",
      "web/sayit/dashboard_thumbnail.jpg",
    ],
    isApp: true,
    link: ["/submit", "/sayit/new"],
    bgColor: "#f8f8f8",
  },
  {
    title: "Live Subtitle Translator",
    tech: "JS, Google Translate API, Chrome API",
    text: "A chrome extension that translates subtitles in real time on the Danish website DR. The extension uses the Chrome API to access the subtitles and the Google Translate API to translate them.",
    isApp: false,
    video: "DR_short.mov",
    link: false,
    bgColor: "#f8f8f8",
  },
  {
    title: "Dashboard UI with HiCharts",
    tech: "React, HiCharts",
    text: "A small demo from part of the dashboard I built with React and HiCharts. The demo was created to show how interactivity improves UX for both the image layers and charts.",
    isApp: false,
    video: "Toxicity.mov",
    link: false,
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
    title: "Movie Quiz",
    tech: "REST API, React, Adobe XD",
    text: "A small interactive quiz built with React where players try to guess the movie by slowly revealing the poster. I made this over a weekend to practice building interactive React components with seperate API calls. ",
    isApp: true,
    link: false,
    component: <MovieQuiz />,
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
    text: "The aTree project was launched in 2019 by Cassinia Environmental, a profit-for-purpose organisation dedicated to reconnecting, restoring, and protecting Australian natural systems. The site was designed in Figma and built with Squarespace. ",
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
