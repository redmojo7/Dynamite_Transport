import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Cover from "./components/Cover";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LeftSidebar from "./components/LeftSidebar";
import Footer from "./components/Footer";
import TruckManager from "./components/TruckManager";
import DepartedTruckManager from "./components/DepartedTruckManager";
import Contact from "./components/Contact";

const routes = [
  { key: "truck", label: "On-site Trucks", component: <TruckManager /> },
  { key: "departedtruck", label: "Departed Trucks", component: <DepartedTruckManager /> },
  { key: "contact", label: "Contact", component: <Contact /> },
];

function App () {
  const [currentPageKey, setCurrentPageKey] = useState("truck");

  const getCurrentPageComponent = () => {
    const selectedRoute = routes.find((route) => route.key === currentPageKey);
    return selectedRoute ? selectedRoute.component : null;
  };

  return (
    <Router>
      <div>
        <NavigationBar setCurrentPageKey={setCurrentPageKey}/>
        <Cover />
        <Container className="mt-3">
          <Row>
            <Col md={2}>
              <LeftSidebar setCurrentPageKey={setCurrentPageKey} />
            </Col>
            <Col md={10}>
              {getCurrentPageComponent()}
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
