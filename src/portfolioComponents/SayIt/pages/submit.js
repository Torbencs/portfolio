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
  margin-left: 2em;
  margin-right: 2em;
`;
const Body = styled.div`
  position: relative;
  width: 100%;
`;

const Home = ({ history }) => {
  const handleLogout = () => {
    history.push("/login");
  };

  const [currentPage, setCurrentPage] = useState("new");

  return (
    <PageContainer>
      <Form handleLogout={handleLogout} />
    </PageContainer>
  );
};

export default Home;
