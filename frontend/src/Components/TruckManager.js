import { getTrucks, createTruck, updateTruck, deleteTruck } from '../Controllers/truckController';
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Trucks from './Trucks';
import TruckForm from './TruckForm.js';

class TruckManager extends Component {
    state = {
        trucks: [],
        response: {
            status: '',
            message: '',
        },
    };

    componentDidMount() {
        // Fetch the initial list of trucks from the backend server
        getTrucks()
            .then((trucksData) => {
                this.setState({ trucks: trucksData });
            })
            .catch((error) => {
                console.error('Error occurred during GET request:', error);
                // Handle the error state
            });
    }

    setResponse = (status, message) => {
        this.setState((prevState) => ({
          response: {
            ...prevState.response,
            status: status,
            message: message,
          }
        }));
      };

    handleAddTruck = async (truck) => {
        console.log('Adding truck:', truck);
        try {
          const trucks = await createTruck(truck);
          console.log('All trucks:', trucks);
          // Update the state to add the new truck to the list
          this.setState({trucks: trucks});
          // Set success response
          this.setResponse('success', 'Truck added successfully');
        } catch (error) {
          console.error('Error occurred during truck creation:', error);
          this.setResponse('error', error.response.data.error);
        }
    };

    handleDeleteTruck = (truckId) => {
        // TODO: Implement logic to delete the truck with the specified ID from the backend server
        console.log('Deleting truck:', truckId);
        // Update the state to remove the truck from the list
        this.setState((prevState) => ({
            trucks: prevState.trucks.filter((truck) => truck.id !== truckId),
        }));
    };

    render() {
        const { trucks } = this.state;
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Truck Manager</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Trucks trucks={trucks} />
                    </Col>
                    <Col>
                        <h2>Add Truck</h2>
                        <TruckForm onAddTruck={this.handleAddTruck} response={this.state.response}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default TruckManager;