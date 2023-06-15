import React from "react";
import { Modal, Button } from "react-bootstrap";

const FirstLoginModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Welcome to the Web Application!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Here is a quick guide on how to use the application:</p>
      <p>1. The navigation bar is located at the top of the page.</p>
      <p>2. You can click on the different links in the navigation bar to navigate to different sections of the application.</p>
      <p>3. The "Truck(On-site)" link will take you to the on-site truck section.</p>
      <p>4. The "Truck(Off-site)" link will take you to the off-site truck section.</p>
      <p>5. The "Contact" link will take you to the contact section.</p>
      {/* Add any other instructions you want */}
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
