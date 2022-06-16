import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//Assets
import LogoSml from "../assets/logo_sml.png";
import LogoLrg from "../assets/logo_lrg.png";
import { UserIcon } from "../assets/icons.js";

//Styles
const HeaderDiv = styled.header`
  margin-top: 2em;
  margin-bottom: 3em;
  position: relative;
  padding: 20px 10px;
  min-width: 700px;
  @media (max-width: 1200px) {
    margin-bottom: 1em;
  }
  @media (max-width: 850px) {
    padding: 0;
  }
`;
const AvatarDiv = styled.div`
  display: flex;
  right: 0;
  align-items: center;
  position: absolute;
  bottom: 0.5em;
  @media (max-width: 850px) {
    bottom: 0px;
  }
`;
const LogoImg = styled.img`
  width: 200px;
  @media (max-width: 1300px) {
    width: 130px;
  }
`;

const Header4 = styled.h4`
  font-size: 1.1em;
  color: #3b3d45;
  font-weight: 500;
  margin-right: 1em;
`;

const Header = ({ avatar, userName, onLogout }) => {
  return (
    <HeaderDiv>
      <Link className="nav__link" to="new">
        <LogoImg
          srcSet={`${LogoSml} 320w, ${LogoLrg} 800w`}
          sizes="(max-width: 600px) 320px, 800px"
          alt="SayIt Logo"
        />
      </Link>
      <AvatarDiv>
        <Header4 onClick={onLogout}>Admin</Header4>
        <UserIcon />
      </AvatarDiv>
    </HeaderDiv>
  );
};

export default Header;
