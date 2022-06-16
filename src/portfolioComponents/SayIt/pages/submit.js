import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";

import Account from "../components/account";
import Todo from "../components/todo";

//Components
import Form from "../components/Form/Form";

//Styles
const PageContainer = styled.div`
  position: relative;
  margin: auto;
  margin-top: 20px;
  background-color: white;
  width: 300px;
  height: 620px;
  border: 9px solid #dfdfdf;
  border-radius: 36px;
`;

const IphoneCamera = styled.div`
  position: absolute;
  width: 140px;
  height: 20px;
  left: 80px;
  top: -1px;
  border-radius: 0 0 20px 20px;
  background-color: #dfdfdf;
`;
const IphoneButton = styled.div`
  position: absolute;
  width: 5px;
  height: 40px;
  left: -13px;
  top: 110px;
  border-radius: 20px 0 0 20px;
  background-color: #dfdfdf;
`;
const IphoneButton2 = styled.div`
  position: absolute;
  width: 5px;
  height: 40px;
  left: -13px;
  top: 160px;
  border-radius: 20px 0 0 20px;
  background-color: #dfdfdf;
`;
const IphoneButton3 = styled.div`
  position: absolute;
  width: 5px;
  height: 60px;
  left: 308px;
  top: 120px;
  border-radius: 0 20px 20px 0;
  background-color: #dfdfdf;
`;

const Home = ({ history, data, setData }) => {
  const handleLogout = () => {
    history.push("/login");
  };

  const [currentPage, setCurrentPage] = useState("new");

  return (
    <PageContainer>
      <IphoneCamera />
      <IphoneButton />
      <IphoneButton2 />
      <IphoneButton3 />
      <Form history={history} data={data} setData={setData} />
    </PageContainer>
  );
};

export default Home;
