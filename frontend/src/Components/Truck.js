import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { getTrucks, updateTruck, createTruck, deleteTruck } from '../Controllers/truckController';

const Truck = () => (
    <Row className="button-row">
        <Col>
            <Button variant="info" onClick={getTrucks}>GET</Button>
        </Col>
        <Col>
            <Button variant="warning" onClick={() => updateTruck("1", null)}>PUT</Button>
        </Col>
        <Col>
            <Button variant="success" onClick={() => createTruck(null)}>POST</Button>
        </Col>
        <Col>
            <Button variant="danger" onClick={() => deleteTruck("2")}>DELETE</Button>
        </Col>
    </Row>
);

export default Truck;
