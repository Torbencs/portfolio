import React, { useEffect, useState } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import "./Work.sass";

//Component
import Gallery from "../../components/Gallery/Gallery";

//Data
import data from "./data";

const Work = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(null);

  return (
    <div className="grid-wrapper">
      {!isOpen &&
        data.map((el, i) => (
          <div className={`masonry-div ${el.size}`} key={i}>
            <img
              src={`${process.env.PUBLIC_URL}/images/${el.imgSrc}`}
              onClick={() => {
                setIsOpen(!isOpen);
                setIndex(i);
              }}
            />
          </div>
        ))}
      {isOpen && (
        <CSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Gallery
            title={data[index].title}
            text={data[index].text}
            img={data[index].imgSrc}
            bgColor={data[index].bgColor}
            textTheme={data[index].textTheme}
            handleOpen={setIsOpen}
          />
        </CSSTransitionGroup>
      )}
    </div>
  );

  {
    /* <Gallery
      title={data[currentPosition].title}
      text={data[currentPosition].text}
      img={data[currentPosition].imgSrc}
      bgColor={data[currentPosition].bgColor}
      textTheme={data[currentPosition].textTheme}
      handleNext={() => setCurrentPosition(currentPosition + 1)}
    /> 


    {data.map((el, i) => (
        <div className={`masonry-div ${el.size}`} key={i}>
          <img src={`${process.env.PUBLIC_URL}/images/${el.imgSrc}`} />
          {isOpen && <Gallery  />}
        </div>
      ))}
    
    */
  }
};

export default Work;
