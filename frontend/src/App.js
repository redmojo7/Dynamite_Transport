import { useState, useEffect } from "react";
import "./App.css";
import NavigationBar from "./Components/NavigationBar";
import Cover from "./Components/Cover";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "./Components/Footer";
import TruckManager from "./Components/TruckManager";
import DepartedTruckManager from "./Components/DepartedTruckManager";
import Contact from "./Components/Contact";
import FirstLoginModal from "./Components/FirstLoginModal";


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
