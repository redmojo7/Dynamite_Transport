import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Trucks from './Trucks';
import { getTruckHistories, deleteTruckHistory } from '../controllers/departedTruckController';


class DepartedTruckManager extends Component {
    state = {
        trucks: [],
    };

    componentDidMount() {
        // Fetch the initial list of trucks from the backend server
        getTruckHistories()
            .then((trucksData) => {
                this.setState({
                    trucks: trucksData,
                });
            })
            .catch((error) => {
                console.error('Error occurred during GET request:', error);
                // Handle the error state
            });
    }

    handleDeleteTruck = async (truckId) => {
        // TODO: Implement logic to delete the truck with the specified ID from the backend server
        console.log('Deleting truck:', truckId);
        const deletedTruckHis = await deleteTruckHistory(truckId);
        const trucks = await getTruckHistories();
        this.setState({ trucks });
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
                        <Trucks trucks={trucks} onDelete={this.handleDeleteTruck}/>
                    </Col>
                    <Col sm={3} />
                </Row>
            </Container>
        );
    }
}

export default DepartedTruckManager;