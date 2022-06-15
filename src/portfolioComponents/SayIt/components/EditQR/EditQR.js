import React, { useEffect, useState, useRef } from "react";
import { withRouter, useRouteMatch } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import QRCodeStyling from "qr-code-styling";

//Styles
import "../CreateQR/CreateQR.css";
//Components
//Assets
import pageBreak from "../../assets/page_break.png";
import logo from "../../assets/logo_txt_sml.png";

const EditQR = ({ location, qrData, setQrData, history }) => {
  const { path, url } = useRouteMatch();

  const [topic, setTopic] = useState(location.state.topic);
  const [question, setQuestion] = useState(location.state.question);
  const [description, setDescription] = useState(location.state.description);

  //QR options
  const [options, setOptions] = useState({
    width: 200,
    height: 200,
    type: "svg",
    data: encodeURI(`http://sayit.company/submit/demo/${topic.toLowerCase()}`),
    image: logo,
    margin: 0,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "M",
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.5,
      margin: 4,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#43384b",
      type: "extra-rounded",
    },
    backgroundOptions: {},
    cornersSquareOptions: {
      color: "#43384b",
      type: "extra-rounded",
    },
    cornersDotOptions: {
      color: "#43384b",
      type: "dot",
    },
  });

  const [qrCode] = useState(new QRCodeStyling(options));
  const ref = useRef(null);

  //Set QR as current ref
  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);
  //Re-render QR code
  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
  }, [qrCode, options]);

  //Handle topic change and QR re-render
  const onTopicChange = (event) => {
    let { value } = event.target;
    setTopic(value);
    setOptions((options) => ({
      ...options,
      data: encodeURI(`http://sayit.company/submit/demo/${value}`),
    }));
  };

  const handleEdit = (event) => {
    event.preventDefault();

    if (typeof qrData !== "undefined" && (qrData.length === 0) == "") {
      const filtered = qrData.filter(
        (item) => item.qrId !== location.state.qrId
      );
      setQrData([
        ...filtered,
        {
          qrId: location.state.qrId,
          topic: topic,
          description: description,
          question: question,
          data: options.data,
        },
      ]);
      history.push(`/sayit/qrcodes`);
    } else {
      console.warn("No QR data - undefined");
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();

    if (typeof qrData !== "undefined" && (qrData.length === 0) == "") {
      const filtered = qrData.filter(
        (item) => item.qrId !== location.state.qrId
      );
      setQrData([...filtered]);
      history.push(`/sayit/qrcodes`);
    } else {
      console.warn("No QR data - undefined");
    }
  };

  return (
    <div className="create__card__container">
      <AnimatePresence>
        <motion.div
          layout
          className="create__card"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="create__card__section--left">
            <h2 className="create__card__question">{question}</h2>
            <div ref={ref}></div>
          </div>
          <div className="create__card__section">
            <input
              id="topic"
              className="create__card__topic create__input"
              value={topic}
              onChange={onTopicChange}
            />

            <textarea
              id="question"
              type="text"
              rows="2"
              cols="30"
              value={question}
              placeholder="Question"
              className="create__input"
              onChange={(e) => setQuestion(e.target.value)}
            />
            <textarea
              id="description"
              name="descriptionTxt"
              rows="4"
              cols="30"
              maxLength="200"
              className="create__input"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button className="create__button" onClick={handleEdit}>
              Save
            </button>
            <button
              className="create__button create__button--red"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default withRouter(EditQR);
