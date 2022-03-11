import React, { useEffect, useState } from "react";
import { CSSTransitionGroup } from "react-transition-group";

//Component
import WebGallery from "../../components/WebGallery/WebGallery";
//Css
import "./Web.sass";

//Data
import webData from "./webData.js";

const Web = (props) => {
  const [isShowing, setIsShowing] = useState(false);
  const [index, setIndex] = useState(null);

  const List = () => (
    //This should be framer motion animate presence
    <CSSTransitionGroup
      transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionEnter={true}
      transitionLeave={false}
    >
      <article className={"web__article"}>
        <h1 className={"web__h1"}>
          Web<span className={"--yellow"}>.</span>
        </h1>
        <ul className="web__list">
          {webData.map((el, i) => (
            <li
              key={i}
              onClick={() => {
                setIsShowing(true);
                setIndex(i);
              }}
            >
              <h3 className="web__list--left">{el.title}</h3>
              <h3 className="web__list--right">{el.tech}</h3>
            </li>
          ))}
        </ul>
      </article>
    </CSSTransitionGroup>
  );
  return !isShowing ? (
    <List />
  ) : (
    <WebGallery
      bgColor={webData[index].bgColor}
      images={webData[index].images}
      isApp={webData[index].isApp}
      component={webData[index].component}
      text={webData[index].text}
      title={webData[index].title}
      handleOpen={setIsShowing}
    />
  );
};

export default Web;
