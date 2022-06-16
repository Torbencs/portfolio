import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

//Component
import CardExpanded from "../CardExpanded/CardExpanded";

//Icons
import icon1 from "../../assets/sales_icon.png";
import icon2 from "../../assets/support_icon.png";
import icon3 from "../../assets/it_icon.png";
import icon4 from "../../assets/complaint_icon.png";

//Styles
import "./Card.sass";
import "../../assets/icons.css";

export default function Card({ data, onEdit, iconNumber }) {
  const [isOpen, setIsOpen] = useState(false);
  const icons = [icon1, icon2, icon3, icon4];

  const handleClick = () => setIsOpen(!isOpen);
  //Handle click outside of expanded card and close it
  const node = useRef();
  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const CardSmall = (props) => (
    <motion.div
      layout
      className="card"
      whileHover={{ scale: 1.03 }}
      onClick={handleClick}
    >
      <motion.img
        className="cardImg"
        src={icons[iconNumber]}
        alt={`Topic Icon for ${data.topic}`}
      />
      <motion.h2 className="cardH2">{data.topic}</motion.h2>
      <motion.p className="cardP">{data.body.substring(0, 270)}</motion.p>
    </motion.div>
  );

  if (!isOpen) {
    return <CardSmall />;
  } else {
    return (
      <React.Fragment>
        <CardSmall />
        <CardExpanded referenceNode={node} data={data} onEdit={onEdit} />
      </React.Fragment>
    );
  }
}
