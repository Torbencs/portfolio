import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

//Css
import "./Form.css";

//Assets
import LogoSml from "../../assets/logo_sml.png";
import LogoLrg from "../../assets/logo_lrg.png";

//Components
import Hamburger from "../Hamburger/Hamburger";

export default function ({
  history,
  handleLogout,
  data,
  setData,
  falseSubmit,
}) {
  const params = useParams();
  const [topic, setTopic] = useState([
    "Sales",
    "IT issue",
    "Complaint",
    "Other",
  ]);
  const [selectedTopic, setSelectedTopic] = useState(topic[0]);
  const [text, setText] = useState("");

  const handleSelect = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //Don't submit if user is visiting the demo front end from a device that scanned the QR code
    if (falseSubmit) {
      alert(
        "This demo isn't currently connected to a backend. You can see the intended user flow on the emulated version instead of going through the QR code"
      );
      history.push("/sayit/new");
    } else {
      const feedback = {
        feedbackId: data.length + 1,
        topic: selectedTopic,
        body: text,
        status: "new",
      };

      setData([...data, feedback]);

      history.push("/sayit/new");
    }
  };

  return (
    <React.Fragment>
      <div className="form__header">
        <img
          className="form__logo"
          srcSet={`${LogoSml} 320w, ${LogoLrg} 800w`}
          sizes="(max-width: 600px) 320px, 800px"
          alt="SayIt Logo"
        />
        <Hamburger handleLogout={handleLogout} />
      </div>
      <h1 className="form__h1">Got Feedback? </h1>
      <h2 className="form__h2">
        {" "}
        Just <span className="form__h1--yellow">say it.</span>
      </h2>
      <form className="form" onSubmit={handleSubmit}>
        <select
          name="select"
          className="form__field capitalize"
          onChange={handleSelect}
        >
          {topic.map((topic) => (
            <option value={topic} key={topic}>
              {topic}
            </option>
          ))}
        </select>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Comment"
          type="text"
          name="comment"
          className="form__field form__text"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <footer className="form__footer">
        <h3>Simple</h3>
        <h3>Anonymous</h3>
        <h3>Feedback</h3>
      </footer>
    </React.Fragment>
  );
}
