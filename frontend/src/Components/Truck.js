import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import TruckModal from './TruckModal';

const truckImage = "container-truck.png"

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
            <>
                <tr key={truck.id}>
                    <td>
                        <Image className="truck-img" src={truckImage} alt="Truck" />
                        {truck.registration}
                    </td>
                    <td>{formattedArrival}</td>
                    <td>{truck.bay}</td>
                    <td>
                        <Button variant="info" onClick={this.openModal}>Update</Button>
                        &nbsp;
                        <Button variant="danger" onClick={this.handleDelete}>X</Button>
                    </td>
                </tr>

                {showModal && (
                    <TruckModal 
                        truck={truck} 
                        occupiedBays={occupiedBays} 
                        onClose={this.closeModal}
                        onUpdate={this.handleUpdateTruck}
                        response={this.state.response} />
                )}
            </>
        );
    }
}

export default Truck;
