import React, { useEffect, useState } from "react";
import "./Design.sass";
import { Route, Link } from "react-router-dom";

//Component
import Gallery from "../../components/Gallery/Gallery";

//Data
import designData from "./designData";

const Design = (props) => {
  const [index, setIndex] = useState(null);

  return (
    <>
      <div className="design__grid">
        {designData.map((el, i) => (
          <div className={`masonry-div ${el.size}`} key={i}>
            <img
              src={`${process.env.PUBLIC_URL}/images/design/${el.imgSrc}`}
              onClick={() => {
                setIndex(i);
                props.history.push(`graphic/${i}`);
              }}
            />
          </div>
        ))}
        <Route
          path="/graphic/:id"
          render={(props) => (
            <Gallery
              {...props}
              title={designData[index].title}
              text={designData[index].text}
              imgSrc={designData[index].imgSrc}
              bgColor={designData[index].bgColor}
              textTheme={designData[index].textTheme}
              altImg={designData[index].altImg}
            />
          )}
        />
      </div>
    </>
  );
};

export default Design;
