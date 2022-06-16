import React, { useEffect, useState } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";

//Assets - REPLACE WITH API CALL
import Loader from "../assets/Loader/Loader";

//Styles
import "../components/Card/Card.sass";

//Components
import Card from "../components/Card/Card";

export default function Content({ history, data }) {
  const [feedback, setFeedback] = useState();
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    //Run when pathName changes
    setLoading(true);
    setFeedback(data.filter((item) => item.status === params.pathName));
    //Add a small delay to simulate API loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [params.pathName, data]);

  const LoadedContent = () => {
    //Check if feedback array is empty
    if (typeof feedback !== "undefined" && (feedback.length === 0) == "") {
      return feedback.map((item) => (
        <Card
          key={item.feedbackId}
          data={item}
          iconNumber={Math.floor(Math.random() * 4)}
          onEdit={handleEdit}
        />
      ));
    } else {
      return <h1 className="loader">No feedback</h1>;
    }
  };

  const handleEdit = (id) => {
    const newFeedback = feedback.filter((item) => item.feedbackId !== id);
    setFeedback(newFeedback);
  };

  return (
    <AnimateSharedLayout type="crossfade">
      <motion.div layout className="cardContainer">
        {loading == true ? <Loader /> : <LoadedContent />}
      </motion.div>
    </AnimateSharedLayout>
  );
}
