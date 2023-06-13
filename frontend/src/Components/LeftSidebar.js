import { Nav } from "react-bootstrap";
import TruckManager from "./TruckManager";
import DepartedTruckManager from "./DepartedTruckManager";

const LeftSidebar = (props) => {

  const navigate = (eventKey) => {
    let currentPage = <TruckManager />;
    if (eventKey === "truck") {
      currentPage = <TruckManager />;
    } else if (eventKey === "departedtruck") {
      currentPage = <DepartedTruckManager />;
    }
    props.setCurrentPage(currentPage);
  };

  return (
    <Nav defaultActiveKey="/" className="flex-column bg-light" onSelect={navigate}>
      <Nav.Link eventKey="truck">Trucks</Nav.Link>
      <Nav.Link  eventKey="departedtruck">Departed Trucks</Nav.Link >
    </Nav>
  );
}

export default LeftSidebar;