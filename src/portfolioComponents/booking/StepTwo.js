import React, { useState } from "react";

import { Calendar } from "react-modern-calendar-datepicker";
import "./animations.css";
import "./calendar.css";

export default (props) => {
  const [selectedDay, setSelectedDay] = useState(null);
  return (
    <div className={"slideIn"}>
      <h1 className={"form__h1"}>When are you arriving?</h1>
      <div className={"calendar__wrapper"}>
        <Calendar
          value={selectedDay}
          onChange={setSelectedDay}
          colorPrimary="#563bdd"
          calendarClassName="custom-calendar"
        />
      </div>
    </div>
  );
};
