import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  @media (max-height: 750px) {
    width: 245px;
    height: 500px;
  }
`;

const Demo = ({ history, data, setData }) => {
  useEffect(() => {
    document.body.style.setProperty("background-color", "white", "important");
  }, []);
  const handleLogout = () => {
    history.push("/login");
  };

  const [currentPage, setCurrentPage] = useState("new");

  return (
    <PageContainer>
      <Form
        history={history}
        data={data}
        setData={setData}
        falseSubmit={true}
      />
    </PageContainer>
  );
};

export default Demo;
