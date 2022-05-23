import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

//Assets - REPLACE WITH API CALL
import salesIcon from "../../assets/sales_icon.png";
import Loader from "../../assets/Loader/Loader";

//Styles
import "./QRCodes.css";

//Components
import CardSettings from "../CardSettings/CardSettings";
import QR from "../QR/QR";

export default function QRCodes({ history, qrData, setQrData }) {
  const [loading, setLoading] = useState(false);

  const LoadedContent = () => {
    //Check if feedback array is empty
    if (typeof qrData !== "undefined" && (qrData.length === 0) == "") {
      //First sort the qrData array by ascending ID field so that edited QR codes don't change position

      let sorted = qrData.sort((x, y) => x.qrId - y.qrId);
      return sorted.map((item) => (
        <Link
          to={{
            pathname: "/edit",
            state: {
              topic: item.topic,
              question: item.question,
              description: item.description,
              qrId: item.qrId,
            },
          }}
          key={item.qrId}
          className="QR__card--link"
        >
          <motion.div
            className="QR__card--expanded"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div className="QR__content--left">
              <QR data={item.data} size={140} keyId={item.qrId} />
            </motion.div>
            <motion.div className="QR__content--right">
              <motion.header className="cardHeader--expanded">
                <motion.h1 className="QR__card__h1">{item.topic}</motion.h1>
              </motion.header>
              <motion.p className="QR__card__question">
                <span className="span--bold">Prompt:</span> {item.question}
              </motion.p>
              <motion.p className="QR__card__description">
                <span className="span--bold">Description: </span>
                {item.description}
              </motion.p>
            </motion.div>
          </motion.div>
        </Link>
      ));
    } else {
      return <h1 className="loader">No feedback</h1>;
    }
  };

  return (
    <AnimatePresence>
      {loading == true ? (
        <div className="QR__loader">
          <Loader />
        </div>
      ) : (
        <React.Fragment>
          <div className="QR__card__container">
            <Link to="/create">
              <div className="QR__newCard">
                <div className="circle-plus">
                  <div className="circle">
                    <div className="horizontal"></div>
                    <div className="vertical"></div>
                  </div>
                </div>
              </div>
            </Link>
            <LoadedContent />
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
