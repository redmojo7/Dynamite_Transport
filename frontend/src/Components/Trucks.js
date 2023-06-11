import React from 'react';
import { Card, Row, Table, Button, Image, Container } from 'react-bootstrap';
const truckImage = 'container-truck.png';

const Truck = ({ truck, onDelete }) => {
    const handleDelete = () => {
        onDelete(truck.id);
    };

    const formattedArrival = new Date(truck.arrival).toLocaleString();
    //const formattedDeparture = new Date(truck.departure).toLocaleString();

    const { id, registration, bay } = truck;

    return (
        <tr key={id}>
            <td>
                <Image className="truck-img" src={truckImage} alt="Truck" />
                {registration}
            </td>
            <td>{formattedArrival}</td>
            {/* <td>{formattedDeparture}</td> */}
            <td>{bay}</td>
            <td>
                <Button variant="danger" onClick={() => handleDelete(id)}>X</Button>
            </td>
        </tr>
    );
};

const Trucks = ({ trucks, onDelete }) => {
    return (
        <Container className='text-center'>
            <Table bordered >
                <thead>
                    <tr>
                        <th className="col-3">Registration</th>
                        <th className="col-5">Arrival</th>
                        {/* <th>Departure</th> */}
                        <th className="col-1">Bay</th>
                        <th className="col-1">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {trucks.map((truck) => (
                        <Truck key={truck.id} truck={truck} onDelete={onDelete} />
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Trucks;
