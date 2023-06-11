import React from "react";
import { Navbar, Nav} from 'react-bootstrap';

// Stateless Functional Component - NavigationBar
const NavigationBar = () => {
    return (
        <Navbar className='bg-light'>
            <Navbar.Brand className="p-2" href="#">Dynamite Transport</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#">Home</Nav.Link>
                    <Nav.Link href="#onsite">Truck(Onsite)</Nav.Link>
                    <Nav.Link href="#offsite">Truck(Offsite)</Nav.Link>
                    <Nav.Link href="#contat">Contat</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;