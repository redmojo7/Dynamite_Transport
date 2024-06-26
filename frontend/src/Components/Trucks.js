import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Truck from './Truck';

const Trucks = ({ trucks, onDelete, onUpdate, occupiedBays, actions }) => {

    return (
        <Container >
            <Row className='text-center sticky-top bg-light' style={{ top: '55px' }}>
                <Col sm={2}><h4>Registration</h4></Col>
                <Col sm={3}><h4>Arrival</h4></Col>
                <Col sm={3}><h4>Departure</h4></Col>
                <Col sm={1}><h4>Bay#</h4></Col>
                <Col sm={3}><h4>Actions</h4></Col>
            </Row>
            {trucks.map((truck) => (
                <Truck key={truck.id} occupiedBays={occupiedBays} truck={truck} onDelete={onDelete} onUpdate={onUpdate} actions={actions} />
            ))}
        </Container>
    );
}

export default Trucks;
