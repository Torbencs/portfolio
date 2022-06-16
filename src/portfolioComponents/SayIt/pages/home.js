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
    { qrId: 1, topic: "qr topic", question: "this is the question" },
    {
      qrId: 2,
      topic: "qr topic",
      question: "this is the question",
      data: "www.google.com",
    },
    {
      qrId: 3,
      topic: "Third topic",
      question: "this is the question",
      data: "www.google.com",
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
