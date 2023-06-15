import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Cover from "./components/Cover";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "./components/Footer";
import TruckManager from "./components/TruckManager";
import DepartedTruckManager from "./components/DepartedTruckManager";
import Contact from "./components/Contact";
import FirstLoginModal from "./components/FirstLoginModal";


function App () {

  const [currentPageKey, setCurrentPageKey] = useState("truck");
  const [showFirstLoginModal, setShowFirstLoginModal] = useState(false);

  const routes = [
    { key: "truck", label: "On-site Trucks", component: <TruckManager setCurrentPageKey={setCurrentPageKey}/> },
    { key: "departedtruck", label: "Departed Trucks", component: <DepartedTruckManager /> },
    { key: "contact", label: "Contact", component: <Contact /> },
  ];

  const getCurrentPageComponent = () => {
    const selectedRoute = routes.find((route) => route.key === currentPageKey);
    return selectedRoute ? selectedRoute.component : null;
  };

  useEffect(() => {
    // Check if it's the user's first login
    const isFirstLogin = localStorage.getItem("firstLogin") === null;

    if (isFirstLogin) {
      // Set the flag to indicate subsequent logins
      localStorage.setItem("firstLogin", "false");
      setShowFirstLoginModal(true);
    }
  }, []);

  const handleFirstLoginModalClose = () => {
    setShowFirstLoginModal(false);
  };


  return (
    <div>
        <NavigationBar setCurrentPageKey={setCurrentPageKey}/>
        <Cover />
        <Container className="mt-3">
          <Row>
            <Col>{getCurrentPageComponent()}</Col>
          </Row>
        </Container>
        <Footer />
        <FirstLoginModal  show={showFirstLoginModal} onHide={handleFirstLoginModalClose}/>
    </div>
  );
};

export default App;
