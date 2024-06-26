import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar = ({ setCurrentPageKey }) => {
    const navigate = (eventKey) => {
        // Scroll to the top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPageKey(eventKey);
    };
    return (
        <Navbar className='bg-light sticky-top'>
            <Container>
                <Navbar.Brand href="#">Dynamite Transport</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" onSelect={navigate}>
                        <Nav.Link eventKey="truck">Truck(On-site)</Nav.Link>
                        <Nav.Link eventKey="departedtruck">Truck(Off-site)</Nav.Link>
                        <Nav.Link eventKey="contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
