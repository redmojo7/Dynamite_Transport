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
        showDeparture: false,
        response: {}
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
                    departure: Date.parse(departure) || '',
                    bay,
                },
                formErrors: '',
                response: props.response,
            };
        }
    }

    handleChange = (value, field) => {
        //console.log('handleChange value:', value, "field:", field);
        this.setState((prevState) => ({
            truck: {
                ...prevState.truck,
                [field]: value,
            },
            formErrors: '',
            response: {},
        }));
        //console.log('handleChange this.state.truck:', this.state.truck);
        
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        // Check if any required fields are empty
        const { registration, arrival, departure, bay } = this.state.truck;
        if (!registration || !arrival || !bay || (this.showDeparture && !departure)) {
            // Handle the empty field case
            console.log('Please fill in all fields.');
            this.setState({
                formErrors: 'Please fill in all fields.',
            });
            return;
        }

        this.setState({ formErrors: '' }); // Clear the formErrors state if all fields are filled
        this.props.onCreatOrUpdateTruck({
            ...this.state.truck,
            arrival: new Date(this.state.truck.arrival),
            departure: new Date(this.state.truck.departure)
        });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.response.id !== this.props.response.id){
            console.log('componentDidUpdate this.props.response:', this.props.response);
            this.setState({ response: this.props.response });
        }
        const { status } = this.state.response;
        // Check if the response status changed to "success"
        if (status === 'success' && prevProps.response.id !== this.props.response.id) {
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
        const { status, message } = this.state.response;
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
                <Form.Group className='mt-3' controlId="registration">
                    <Form.Label className="fw-bold">Registration</Form.Label>
                    <Form.Control
                        type="text"
                        name="registration"
                        value={truck.registration}
                        onChange={(event) => this.handleChange(event.target.value, 'registration')}
                    />
                </Form.Group>
                <Form.Group className='mt-3' controlId="arrival">
                    <Form.Label className="fw-bold">Arrival</Form.Label>
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
                    <Form.Check className='mt-3'
                        type="checkbox"
                        label="Departured"

                        onChange={(event) => this.setState({ showDeparture: event.target.checked })}
                    />
                )}
                {truck.id && this.state.showDeparture && (
                    <Form.Group className='mt-3' controlId="departure">
                        <p className="text-muted mt-2">Note: If the truck is marked as departed with a departure time, it will be moved to the Departed Trucks.</p>
                        <Form.Label className="fw-bold">Departure</Form.Label>
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
                <Form.Group className='mt-3' controlId="bay">
                    <Form.Label className="fw-bold">Bay#</Form.Label>
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
                {formErrors && <Alert className='mt-2' variant="danger" >{formErrors}</Alert>}
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
