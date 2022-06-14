import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

//Css
import "./Nav.sass";

//Icons
import {
  NewIcon,
  SavedIcon,
  DeletedIcon,
  SettingsIcon,
  StatsIcon,
  QRIcon,
} from "../../assets/icons";

export default function Nav({ handlePage }) {
  const { path, url } = useRouteMatch();

  return (
    <nav className="nav__container">
      <ul>
        <Link className="nav__link" to={`${url}/new`}>
          <li className="nav__li">
            <NewIcon />

            <h3 className="nav__link">New</h3>
          </li>
        </Link>
        <Link className="nav__link" to={`${url}/saved`}>
          <li className="nav__li">
            <SavedIcon />
            <h3 className="nav__link">Saved</h3>
          </li>
        </Link>
        <Link className="nav__link" to={`${url}/qrcodes`}>
          <li className="nav__li">
            <QRIcon />

            <h3 className="nav__link">QR codes</h3>
          </li>
        </Link>
        <Link className="nav__link" to={`${url}/stats`}>
          <li className="nav__li">
            <StatsIcon />
            <h3 className="nav__link">Statistics</h3>
          </li>
        </Link>
        <Link className="nav__link" to={`${url}/deleted`}>
          <li className="nav__li">
            <DeletedIcon />

            <h3 className="nav__link">Deleted</h3>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
