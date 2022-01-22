import React, { useEffect, useState } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import "./Design.sass";

//Component
import Gallery from "../../components/Gallery/Gallery";

//Data
import designData from "./designData";

const Design = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(null);

  return (
    <>
      <div className="grid-wrapper">
        {!isOpen &&
          designData.map((el, i) => (
            <div className={`masonry-div ${el.size}`} key={i}>
              <img
                src={`${process.env.PUBLIC_URL}/images/design/${el.imgSrc}`}
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
              title={designData[index].title}
              text={designData[index].text}
              imgSrc={designData[index].imgSrc}
              bgColor={designData[index].bgColor}
              textTheme={designData[index].textTheme}
              handleOpen={setIsOpen}
            />
          </CSSTransitionGroup>
        )}
      </div>
    </>
  );
};

export default Design;
