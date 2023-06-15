import { Nav } from "react-bootstrap";

const LeftSidebar = ({ setCurrentPageKey }) => {
  const navigate = (eventKey) => {
    setCurrentPageKey(eventKey);
  };

  return (
    <Nav defaultActiveKey="/" className="flex-column bg-light" onSelect={navigate}>
      <Nav.Link eventKey="truck">On-site Trucks</Nav.Link>
      <Nav.Link eventKey="departedtruck">Departed Trucks</Nav.Link>
      <Nav.Link eventKey="contact">Contact</Nav.Link>
    </Nav>
  );
};

export default LeftSidebar;
