import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";

//Css
import "./Score.sass";

const Score = (props) => {
  const data = {
    labels: ["1%", "5%", "1%", "8%", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        label: "Score",
        data: [12, 15, 2, 4, 5, 2, 10, 4, 20, 12],
        backgroundColor: "#2f2042",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <article className={"score__article"}>
      <h1 className={"score__h1"}>
        {props.location.state.score}
        <span className={"--yellow"}>.</span>
      </h1>
      <Bar data={data} options={options} />
    </article>
  );
};

export default Score;
