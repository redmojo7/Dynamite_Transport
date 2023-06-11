import { getTrucks, createTruck, updateTruck, deleteTruck } from '../controllers/truckController';
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Trucks from './Trucks';
import TruckForm from './TruckForm.js';

class TruckManager extends Component {
    state = {
        trucks: [],
        occupiedBays: [],
        response: {
            status: '',
            message: '',
        },
    };

    componentDidMount() {
        // Fetch the initial list of trucks from the backend server
        getTrucks()
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

    componentDidUpdate(prevProps, prevState) {
        // Check if the trucks state changed
        // If so, update the occupied bays state
        if (prevState.trucks !== this.state.trucks) {
            const occupiedBays = this.state.trucks.map((truck) => truck.bay);
            this.setState({ occupiedBays });
        }
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
            this.setState({ trucks: trucks });
            // Set success response
            this.setResponse('success', 'Truck added successfully');
        } catch (error) {
            console.error('Error occurred during truck creation:', error);
            this.setResponse('error', error.response.data.error);
        }
    };

    handleUpdateTruck = async (truck) => {
        console.log('Updating truck:', truck);
        try {
            const trucks = await updateTruck(truck);
            console.log('All trucks:', trucks);
            // Update the state to add the new truck to the list
            this.setState({ trucks: trucks });
            // Set success response
            this.setResponse('success', 'Truck updated successfully');
        } catch (error) {
            console.error('Error occurred during truck update:', error);
            this.setResponse('error', error.response.data.error);
        }
    }

    handleDeleteTruck = (truckId) => {
        // TODO: Implement logic to delete the truck with the specified ID from the backend server
        console.log('Deleting truck:', truckId);
        // Update the state to remove the truck from the list

        deleteTruck(truckId)
            .then((trucksData) => {
                this.setState({ trucks: trucksData });
            })
            .catch((error) => {
                console.error('Error occurred during DELETE request:', error);
                // Handle the error state
            });
        //this.setState((prevState) => ({
        //    trucks: prevState.trucks.filter((truck) => truck.id !== truckId),
        //}));
    };

    render() {
        const { trucks } = this.state;
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Onsite Trucks</h1>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Trucks occupiedBays={this.state.occupiedBays} trucks={trucks} onDelete={this.handleDeleteTruck} onUpdate={this.handleUpdateTruck} />
                    </Col>
                    <Col sm={{ span: 4, offset: 1 }}>
                        <h2>Add Truck</h2>
                        
                        <TruckForm occupiedBays={this.state.occupiedBays} onAddTruck={this.handleAddTruck} response={this.state.response} />
    
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default TruckManager;