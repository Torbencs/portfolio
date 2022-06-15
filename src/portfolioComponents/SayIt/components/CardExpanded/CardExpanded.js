import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";

//Icons
import savedIcon from "../../assets/saved_icon.png";
import shareIcon from "../../assets/share_icon.png";
import deleteIcon from "../../assets/delete_icon.png";
import pageBreak from "../../assets/page_break.png";

const CardExpanded = ({ data, referenceNode, onEdit }) => {
  const params = useParams();

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${data.topic} Feedback`,
        text: data.body,
      });
    } catch (err) {
      console.warn("Error");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        layout
        key={data.feedbackId}
        className="card--expanded"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
        ref={referenceNode}
      >
        <motion.header className="cardHeader--expanded">
          <motion.h1 className="cardH1--expanded">{data.topic}</motion.h1>
          <motion.div className="cardIcons--expanded">
            {params.pathName !== "saved" && (
              <div class="tooltip">
                <motion.img
                  className="cardIcon--expanded"
                  src={savedIcon}
                  alt={`Save icon`}
                  whileHover={{ scale: 1.2 }}
                  onClick={(e) => {
                    data.status = "saved";
                    onEdit(data.feedbackId);
                  }}
                />
                <span class="tooltiptext">Save</span>
              </div>
            )}
            <div class="tooltip">
              <motion.img
                className="cardIcon--expanded"
                src={shareIcon}
                alt={`Share feedback icon`}
                whileHover={{ scale: 1.2 }}
                onClick={handleShare}
              />
              <span class="tooltiptext">Share</span>
            </div>
            {params.pathName !== "deleted" && (
              <div class="tooltip">
                <motion.img
                  className="cardIcon--expanded"
                  src={deleteIcon}
                  alt={`Delete feedback icon`}
                  whileHover={{ scale: 1.2 }}
                  onClick={(e) => {
                    data.status = "deleted";
                    onEdit(data.feedbackId);
                  }}
                />
                <span class="tooltiptext">Delete</span>
              </div>
            )}
          </motion.div>
        </motion.header>
        <motion.h3 className="cardDate">{data.createdAt}</motion.h3>
        <motion.img
          className="cardPageBreak"
          height="30"
          width="60"
          src={pageBreak}
          alt={`Page break`}
        />
        <motion.p className="cardP--expanded">{data.body}</motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default CardExpanded;
