import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import Truck from './Truck';

class Trucks extends Component {

    render() {
        const { trucks, onDelete, onUpdate } = this.props;
        const occupiedBays = this.props.occupiedBays;

        return (
            <Container className="text-center">
                <Table bordered>
                    <thead>
                        <tr>
                            <th className="col-3">Registration</th>
                            <th className="col-4">Arrival</th>
                            <th className="col-1">Bay#</th>
                            <th className="col-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trucks.map((truck) => (
                            <Truck key={truck.id} occupiedBays={occupiedBays} truck={truck} onDelete={onDelete} onUpdate={onUpdate} />
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default Trucks;
