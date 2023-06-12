import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class FleetItem extends Component {
    render() {
        const { fleet } = this.props;
        const { id, registration, arrival, departure, bay } = fleet;

        return (
            <Card>
                <Card.Body>
                    <Card.Title>Registration: {registration}</Card.Title>
                    <Card.Text>
                        Arrival: {arrival}<br />
                        Departure: {departure}<br />
                        Bay: {bay}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default FleetItem;
