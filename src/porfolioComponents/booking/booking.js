import React, { useState, useEffect } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import MultiStep from "./Multistep";

import "./animations.css";

//Form steps
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const Booking = (props) => {
  const [showComponent, setShowComponent] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState(null);
  const [product, setProduct] = useState("");
  const [participants, setParticipants] = useState(1);
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const [selectedDay, setSelectedDay] = useState({
    year: 2020,
    month: 9,
    day: 5,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const steps = [
    { component: <StepOne name={name} onChange={setName} /> },
    { component: <StepTwo name={name} onChange={setName} /> },
    { component: <StepThree name={name} onChange={setName} /> },
  ];

  return (
    <div className="form-style-5">
      <MultiStep steps={steps} />
    </div>
  );
};

export default Booking;
