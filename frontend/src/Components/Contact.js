import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

const Contact = () => {
    return (
        <Container>
            <h1 >Contact Us</h1>
            <Row >
                <Col className="text-left" xs={12}>
                    <p>Kent St</p>
                    <p>Bentley, WA 6102</p>
                    <p>Email: <a href="mailto:21053409@student.curtin.edu.au">21053409@student.curtin.edu.au</a></p>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact;
