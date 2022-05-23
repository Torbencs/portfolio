import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

import axios from "axios";

//css
import "../CardSettings/CardSettings.css";

//Icons
import savedIcon from "../../assets/saved_icon.png";
import shareIcon from "../../assets/share_icon.png";
import deleteIcon from "../../assets/delete_icon.png";
import pageBreak from "../../assets/page_break.png";

const CardSettings = ({ data }) => {
  //Move feedback to saved or deleted
  const handleEdit = (id) => {
    const options = {
      url: `/users/${id}`,
      method: "put",
      data: {
        saved: true,
        new: false,
        deleted: false,
      },
    };

    // ApiCall(options);
  };

  const ApiCall = (options) => {
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios(options)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <AnimatePresence>
      <motion.div
        layout
        className="settings__card--expanded"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.header className="cardHeader--expanded">
          <motion.h1 className="cardH1--expanded">Account Settings</motion.h1>
        </motion.header>

        <motion.p className="cardP--expanded">"Settings text</motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default CardSettings;
