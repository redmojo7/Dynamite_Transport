import React from "react";
import { Navbar, Nav, Container} from 'react-bootstrap';

// Stateless Functional Component - NavigationBar
const NavigationBar = () => {
    return (
        <Navbar className='bg-light'>
            <Container>
                <Navbar.Brand href="#">Dynamite Transport</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#">Home</Nav.Link>
                        <Nav.Link href="#onsite">Truck(On-site)</Nav.Link>
                        <Nav.Link href="#offsite">Truck(Off-site)</Nav.Link>
                        <Nav.Link href="#contat">Contat</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>   
    );
}

export default NavigationBar;