import { getTrucks, createTruck, updateTruck, deleteTruck } from '../controllers/truckController';
import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import Trucks from './Trucks';
import TruckForm from './TruckForm.js';

class TruckManager extends Component {
    state = {
        bays: 12,
        selectedTruck: {},
        trucks: [],
        occupiedBays: [],
        response: {
            status: '',
            message: '',
        },
        showMoveModal: false,
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
            // Check if the updated truck is in the list of trucks
            if (trucks.every((t) => t.id !== truck.id)) {
                // Show the modal (going to departed truck)
                this.setState({ 
                    selectedTruck: truck,
                    showMoveModal: true });
            }
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
            });
    };

    handleCancelMove = () => {
        this.setState({ showMoveModal: false });
        console.log('Going to departed trucks cancelled');
    };

    handleGotoDepartedTrucks = () => {
        this.setState({ showMoveModal: false });
        console.log('Going to departed trucks');
        // Scroll to the top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.props.setCurrentPageKey('departedtruck');
    };


    render() {
        const { trucks, showMoveModal } = this.state;
        const availableBays = this.state.bays - this.state.occupiedBays.length;
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Onsite Trucks</h1>
                    </Col>
                </Row>
                <Row className='text-center pt-2'>
                    <Col sm={3}><h5>Site Name</h5></Col>
                    <Col sm={3}><h5>Occupied Bays</h5></Col>
                    <Col sm={3}><h5>Available Bays</h5></Col>
                </Row>
                <Row className='text-center '>
                    <Col sm={3}><h6>Welshpool</h6></Col>
                    <Col sm={3}><h6>{this.state.occupiedBays.length}</h6></Col>
                    <Col sm={3}><h6>{availableBays}</h6></Col>
                </Row>
                <Row className='mt-2'>
                    <Col sm={8} className="mx-auto">
                        <Trucks occupiedBays={this.state.occupiedBays} trucks={trucks} onDelete={this.handleDeleteTruck} onUpdate={this.handleUpdateTruck} />
                    </Col>
                    <Col sm={3} className="bg-light p-4">
                        <h2>Add Truck</h2>
                        <TruckForm occupiedBays={this.state.occupiedBays} onAddTruck={this.handleAddTruck} response={this.state.response} />
                    </Col>
                </Row>
                {showMoveModal && (
                    <Modal show={showMoveModal} onHide={this.handleCancelMove}>
                        <Modal.Header closeButton>
                            <Modal.Title>Move to Departed Trucks</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Do you want to go to Departed Trucks to view truck (<strong>{this.state.selectedTruck.registration}</strong>)?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCancelMove}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={() => this.handleGotoDepartedTrucks()}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>)}
            </Container>
        );
    }
}

export default TruckManager;