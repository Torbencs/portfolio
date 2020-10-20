import React, { useEffect, useState, useRef } from "react";
import "../Participants/Participants.sass";

const Participants = (props) => {
  const [number, setNumber] = useState(1);
  const [plural, setPlural] = useState("Person");
  const decrementElement = useRef(null);

  useEffect(() => {
    if (number > 1) {
      setPlural("People");
    } else {
      setPlural("Person");
    }
  }, [number]);

  return (
    <div className={"Participants-center"}>
      <div className={"Participants-middle"}>
        <div className={"left"}>
          <div
            ref={decrementElement}
            className={"Participants-minus"}
            onClick={(e) => (number == 1 ? number : setNumber(number - 1))}
          ></div>
        </div>

        <p className={"Participants-selector"}>{number}</p>
        <p className={"Participants-plural"}>{plural}</p>

        <div className={"right"}>
          <div
            className={"Participants-plus"}
            onClick={(e) => setNumber(number + 1)}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Participants;
