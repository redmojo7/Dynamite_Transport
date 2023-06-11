import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import TruckForm from './TruckForm';

class TruckModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updatedTruck: { ...props.truck },
            response: { status: '', message: '' }
        };
    }


    handleUpdate = () => {
        const { updatedTruck } = this.state;
        // Check if the arrival date is after the departure date
        console.log('updatedTruck info:', updatedTruck);
        if (updatedTruck.departure && updatedTruck.arrival > updatedTruck.departure) {
            console.log('Arrival date must be before departure date.');
            this.setState({
                response: {
                    status: 'error',
                    message: 'Arrival date must be before departure date.'
                }
            });
            return;
        }
        this.props.onUpdate(updatedTruck);
        this.props.onClose();
    };

    handleAddTruck = (truckForm) => {
        console.log('handleAddTruck truckForm:', truckForm);
        // Check if the arrival date is after the departure date
        if (truckForm.departure && truckForm.arrival > truckForm.departure) {
            console.log('Arrival date must be before departure date.');
            this.setState({
                response: {
                    status: 'error',
                    message: 'Arrival date must be before departure date.'
                }
            });
            return;
        }
        this.props.onUpdate(truckForm);
        this.props.onClose();
    };

    render() {
        const { updatedTruck, response } = this.state;
        const { onClose, occupiedBays } = this.props;

        return (
            <Modal show onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Truck</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TruckForm
                        occupiedBays={occupiedBays}
                        truck={updatedTruck}
                        onAddTruck={this.handleAddTruck}
                        response={response}
                        onClose={onClose}
                    />
                </Modal.Body>
                {/*
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.handleUpdate}>
                        {updatedTruck.id ? 'Update' : 'Add'}
                    </Button>
                </Modal.Footer>
        */}
            </Modal>
        );
    }
}

export default TruckModal;
