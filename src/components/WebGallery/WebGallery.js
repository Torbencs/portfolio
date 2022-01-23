import React, { useEffect, useState } from "react";
//Css
import "./WebGallery.sass";

const WebGallery = (props) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <section
      className={"web__container--gallery"}
      style={{ backgroundColor: props.bgColor }}
    >
      <h1 className="webgallery__h1">
        SJM Designs<span className={"--yellow"}>.</span>
      </h1>
      <p className="webgallery__p">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
        molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
        officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
        nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque
        error repudiandae fuga? Ipsa laudantium molestias eos.
      </p>

      <div
        className={`web__webgallery ${isActive && "web__webgallery--active"}`}
        onClick={() => setIsActive(true)}
      >
        {props.images.map((image, index) => (
          <img src={`${process.env.PUBLIC_URL}/images/${image}`} />
        ))}
      </div>
      <div className="webgallery__triangle">
        <div className="close" onClick={() => props.handleOpen(false)}></div>
      </div>
    </section>
  );
};

export default WebGallery;
