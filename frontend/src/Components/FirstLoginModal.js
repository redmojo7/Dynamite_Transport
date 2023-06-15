import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

const FirstLoginModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Welcome to the Web Application!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Here is a quick guide on how to use the application:</p>
        <ListGroup variant="flush">
          <ListGroup.Item variant="primary">
            Step 1: Navigation
          </ListGroup.Item>
          <ListGroup.Item>
            Click on the navigation bar located at the top of the page.
          </ListGroup.Item>
          <ListGroup.Item variant="success">
            Step 2: On-site Trucks
          </ListGroup.Item>
          <ListGroup.Item>
            Click on "Truck(On-site)" in the navigation bar to view on-site trucks.
          </ListGroup.Item>
          <ListGroup.Item variant="info">
            Step 3: Off-site Trucks
          </ListGroup.Item>
          <ListGroup.Item>
            Click on "Truck(Off-site)" in the navigation bar to view off-site trucks.
          </ListGroup.Item>
          <ListGroup.Item variant="warning">
            Step 4: Contact
          </ListGroup.Item>
          <ListGroup.Item>
            Click on "Contact" in the navigation bar to access the contact section.
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Got it!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FirstLoginModal;
