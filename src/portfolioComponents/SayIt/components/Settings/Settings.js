import React, { useEffect, useState } from "react";
import axios from "axios";
import { authMiddleWare } from "../../util/auth";

//Assets - REPLACE WITH API CALL
import salesIcon from "../../assets/sales_icon.png";
import Loader from "../../assets/Loader/Loader";

//Styles
import "./Settings.css";

//Components
import CardSettings from "../CardSettings/CardSettings";

export default function Settings({ history }) {
  const [settings, setSettings] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    //Not sure if required - delete
    authMiddleWare(history);
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get("/user")
      .then((response) => {
        console.log(response.data);
        setSettings(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdit = (id) => {};

  return (
    <div className="settings__card__container">
      <CardSettings data={settings} />
    </div>
  );
}
