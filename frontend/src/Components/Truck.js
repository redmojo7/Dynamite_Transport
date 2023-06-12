import React, { Component } from 'react';
import { Button, Image, Row, Col, Container } from 'react-bootstrap';
import TruckModal from './TruckModal';

const truckImage = "truck.png"

class Truck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    handleDelete = () => {
        const { truck, onDelete } = this.props;
        onDelete(truck.id);
    };

    handleUpdateTruck = (truckForm) => {
        console.log('handleUpdateTruck truckForm:', truckForm);
        this.props.onUpdate(truckForm);
    }

    openModal = () => {
        this.setState({ showModal: true });
    };

    closeModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        const { truck } = this.props;
        const { showModal } = this.state;
        const formattedArrival = new Date(truck.arrival).toLocaleString();
        const occupiedBays = this.props.occupiedBays;

        return (
            <div>
                <hr />
                <Row key={truck.id} className="mt-2">
                    <Col sm={3}>
                        <Image className="truck-img" src={truckImage} alt="Truck" />&nbsp;&nbsp;
                        {truck.registration}
                    </Col>
                    <Col sm={4}>{formattedArrival}</Col>
                    <Col sm={1}>{truck.bay}</Col>
                    <Col sm={4}>
                        <Button size="sm" variant="info" onClick={this.openModal}>Update</Button>
                        &nbsp;
                        <Button size="sm" variant="danger" onClick={this.handleDelete}>X</Button>
                    </Col>
                </Row>

                {showModal && (
                    <TruckModal
                        truck={truck}
                        occupiedBays={occupiedBays}
                        onClose={this.closeModal}
                        onUpdate={this.handleUpdateTruck}
                        response={this.state.response} />
                )}
            </div>
        );
    }
}

export default Truck;
