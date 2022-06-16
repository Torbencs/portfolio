import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { useHistory } from "react-router-dom";

//Components
import Header from "../components/Header";
import Nav from "../components/Nav/Nav";
import Content from "../components/Content";
import QRCodes from "../components/QRCodes/QRCodes";
import Chart from "../components/Chart/Chart";

//Pages
import CreateQR from "../components/CreateQR/CreateQR";
import EditQR from "../components/EditQR/EditQR";

//Styles
const PageContainer = styled.div`
  margin-left: 5em;
  margin-right: 5em;
  @media (max-width: 850px) {
    margin: 2em;
  }
`;
const Body = styled.div`
  position: relative;
  width: 100%;
`;

const Home = ({ location, data }) => {
  const history = useHistory();
  const { path, url } = useRouteMatch();

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    uiLoading: true,
    imageLoading: false,
  });

  const [qrData, setQrData] = useState([
    {
      qrId: 1,
      topic: "Customer Satisfaction",
      question: "Did you enjoy your stay with us?",
      data: "https://torbencs.github.io/portfolio/#/demo",
    },
    {
      qrId: 2,
      topic: "New Procedures",
      question: "Have the new sales procedures been implemented well?",
      data: "https://torbencs.github.io/portfolio/#/demo",
    },
    {
      qrId: 3,
      topic: "Workplace safety",
      question: "Do you feel safe at work?",
      description: "",
      data: "https://torbencs.github.io/portfolio/#/demo",
    },
  ]);

  useEffect(() => {
    //Remove body border for SayIt app view
    document.body.style.border = "none";

    //history.push("/sayit/new");

    return () => {
      document.body.style.border = "40px solid #ffffff";
    };
  });

  return (
    <PageContainer>
      <Header />
      <Body>
        <Nav />

        <Switch>
          <Route path={`${path}/qrcodes`} exact>
            <QRCodes qrData={qrData} />
          </Route>
          <Route path={`${path}/qrcodes/create`} exact>
            <CreateQR qrData={qrData} setQrData={setQrData} />
          </Route>
          <Route path={`${path}/qrcodes/edit`} exact>
            <EditQR qrData={qrData} setQrData={setQrData} location={location} />
          </Route>
          <Route path={`${path}/stats`} exact>
            <Chart />
          </Route>

          {
            //Below should really be called "cards" instead of "content"
          }
          <Route path={`${path}/:pathName`} exact>
            <Content data={data} />
          </Route>
        </Switch>
      </Body>
    </PageContainer>
  );
};

export default Home;
