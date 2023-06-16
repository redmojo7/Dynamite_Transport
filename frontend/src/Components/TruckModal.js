import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import TruckForm from './TruckForm';

class TruckModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: { id: '', status: '', message: '' }
        };
    }

    handleCreatOrUpdateTruck = (truckForm) => {
        console.log('handleAddTruck truckForm:', truckForm);
        // Check if the arrival date is after the departure date
        if (truckForm.departure && truckForm.arrival > truckForm.departure) {
            console.log('Arrival date must be before departure date.');
            this.setState({
                response: {
                    id: new Date().getTime(),
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
        const { response } = this.state;
        const { onClose, occupiedBays,truck } = this.props;

        return (
            <Modal show onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Truck</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TruckForm
                        occupiedBays={occupiedBays}
                        truck={truck}
                        onCreatOrUpdateTruck={this.handleCreatOrUpdateTruck}
                        response={response}
                        onClose={onClose}
                    />
                </Modal.Body>
            </Modal>
        );
    }
}

export default TruckModal;
