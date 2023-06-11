import React, { Component } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

class TruckForm extends Component {
    state = {
        truck: {
            id: '',
            registration: '',
            arrival: new Date(),
            departure: '',
            bay: '',
        },
        formErrors: '',
    };

    constructor(props) {
        super(props);
        if (props.truck) {
            const { id, registration, arrival, departure, bay } = props.truck;
            this.state = {
                truck: {
                    id,
                    registration,
                    arrival: Date.parse(arrival),
                    departure: Date.parse(departure),
                    bay,
                },
                formErrors: '',
            };
        }
    }

    handleChange = (value, field) => {
        this.setState((prevState) => ({
            truck: {
                ...prevState.truck,
                [field]: value,
            },
            formErrors: '',
        }));
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        // Check if any required fields are empty
        const { registration, arrival, bay } = this.state.truck;
        if (!registration || !arrival || !bay) {
            // Handle the empty field case
            console.log('Please fill in all fields.');
            this.setState({
                formErrors: 'Please fill in all fields.',
            });
            return;
        }

        this.setState({ formErrors: '' }); // Clear the formErrors state if all fields are filled
        this.props.onAddTruck({
            ...this.state.truck,
            arrival: new Date(this.state.truck.arrival),
            departure: new Date(this.state.truck.arrival)
        });
    };

    componentDidUpdate(prevProps) {
        const { status } = this.props.response;
        // Check if the response status changed to "success"
        if (status === 'success' && prevProps.response.status !== 'success') {
            // Clear the form state
            this.setState({
                truck: {
                    id: '',
                    registration: '',
                    arrival: new Date(),
                    departure: '',
                    bay: '',
                },
            });
        }
    }

    onClose = () => {
        this.props.onClose();
    }

    render() {
        const { truck, formErrors } = this.state;
        const { status, message } = this.props.response;
        const { truck: selectedTruck, occupiedBays } = this.props;

        let filteredOccupiedBays = occupiedBays;
        if (selectedTruck) {
            filteredOccupiedBays = occupiedBays.filter((bay) => bay !== selectedTruck.bay);
        }

        const availableBays = Array.from({ length: 12 }, (_, i) => i + 1).filter(
            (b) => !filteredOccupiedBays.includes(b.toString())
        );

        return (
            <Form onSubmit={this.handleSubmit}>
                {status === 'error' && <Alert variant="danger">{message}</Alert>}
                <Form.Group controlId="registration">
                    <Form.Label>Registration</Form.Label>
                    <Form.Control
                        type="text"
                        name="registration"
                        value={truck.registration}
                        onChange={(event) => this.handleChange(event.target.value, 'registration')}
                    />
                </Form.Group>
                <Form.Group controlId="arrival">
                    <Form.Label>Arrival</Form.Label>
                    <DatePicker
                        selected={truck.arrival}
                        onChange={(date) => this.handleChange(date, 'arrival')}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="dd-MM-yyyy HH:mm"
                        className="form-control"
                    />
                </Form.Group>
                {truck.id && (
                    <Form.Group controlId="departure">
                        <Form.Label>Departure</Form.Label>
                        <DatePicker
                            selected={truck.departure}
                            onChange={(date) => this.handleChange(date, 'departure')}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="dd-MM-yyyy HH:mm"
                            className="form-control"
                        />
                    </Form.Group>
                )}
                <Form.Group controlId="bay">
                    <Form.Label>Bay#</Form.Label>
                    <Form.Control
                        as="select"
                        name="bay"
                        value={truck.bay}
                        onChange={(event) => this.handleChange(event.target.value, 'bay')}
                    >
                        <option value="">Select Bay</option>
                        {availableBays.map((b) => (
                            <option key={b} value={b}>
                                {b}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                {formErrors && <Alert variant="danger">{formErrors}</Alert>}
                {truck.id && (
                    <Button className="mt-4 float-start" variant="secondary" onClick={this.onClose}>
                        Cancel
                    </Button>
                )}
                <Button className="mt-4 float-end" variant="primary" type="submit">
                    {truck.id ? 'Update' : 'Add Truck'}
                </Button>
            </Form>
        );
    }
}

export default TruckForm;
