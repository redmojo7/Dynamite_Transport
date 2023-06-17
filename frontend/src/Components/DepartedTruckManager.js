import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Trucks from './Trucks';
import { getDepartedTrucks, deleteDepartedTrucks } from '../Controllers/departedTruckController';


class DepartedTruckManager extends Component {

    state = {
        trucks: [],
    };

    componentDidMount() {
        // Fetch the initial list of trucks from the backend server
        getDepartedTrucks()
            .then((departedTrucks) => {
                this.setState({ trucks: departedTrucks });
            }).catch((error) => {
                console.error('Error occurred during GET request:', error);
            });
    }

    handleDeleteTruck = async (truckId) => {
        // Delete the truck from the backend server
        console.log('Deleting truck:', truckId);
        await deleteDepartedTrucks(truckId)
            .then((departedTrucks) => {
                this.setState({ trucks: departedTrucks });
            }).catch((error) => {
                console.error('Error occurred during DELETE request:', error);
            });
    };

    render() {
        const { trucks } = this.state;
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Departed Trucks</h1>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8} className="mx-auto">
                        <Trucks trucks={trucks} onDelete={this.handleDeleteTruck} />
                    </Col>
                    <Col sm={3} />
                </Row>
            </Container>
        );
    }
}

export default DepartedTruckManager;