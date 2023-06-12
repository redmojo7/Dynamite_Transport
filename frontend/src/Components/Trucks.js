import React, { Component } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import Truck from './Truck';

class Trucks extends Component {

    render() {
        const { trucks, onDelete, onUpdate } = this.props;
        const occupiedBays = this.props.occupiedBays;

        return (
            <Container className='text-center'>
                <Row >
                    <Col sm={3}><h3>Registration</h3></Col>
                    <Col sm={4}><h3>Arrival</h3></Col>
                    <Col sm={1}><h3>Bay#</h3></Col>
                    <Col sm={4}><h3>Actions</h3></Col>  
                </Row>
                {trucks.map((truck) => (
                            <Truck key={truck.id} occupiedBays={occupiedBays} truck={truck} onDelete={onDelete} onUpdate={onUpdate} />
                        ))}
            </Container>
        );
    }
}

export default Trucks;
