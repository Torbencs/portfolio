import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

//Component
import WebGallery from "../../components/WebGallery/WebGallery";
//Css
import "./Web.sass";

//Data
import webData from "./webData.js";

const Web = (props) => {
  const [index, setIndex] = useState(null);

  const List = () => (
    <article className={"web__article"}>
      <h1 className={"web__h1"}>
        Web<span className={"--yellow"}>.</span>
      </h1>
      <ul className="web__list">
        {webData.map((el, i) => (
          <li
            key={i}
            onClick={() => {
              setIndex(i);
              props.history.push(`/web/${i}`);
            }}
          >
            <h3 className="web__list--left">{el.title}</h3>
            <h3 className="web__list--right">{el.tech}</h3>
          </li>
        ))}
      </ul>
    </article>
  );
  return (
    <Switch>
      <Route exact path="/web" render={(props) => <List />} />
      <Route
        path="/web/:id"
        render={(props) => (
          <WebGallery
            {...props}
            bgColor={webData[index].bgColor}
            images={webData[index].images}
            isApp={webData[index].isApp}
            component={webData[index].component}
            text={webData[index].text}
            title={webData[index].title}
          />
        )}
      />
    </Switch>
  );
};

export default Web;
