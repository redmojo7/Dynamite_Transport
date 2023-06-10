import React, { Component } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

class TruckForm extends Component {
    state = {
        registration: '',
        arrival: new Date(),
        departure: new Date(),
        bay: '',
        formErrors: ''
    };

    handleChange = (value, field) => {
        this.setState({
            [field]: value,
            formErrors: ''
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        // Check if any required fields are empty
        if (!this.state.registration || !this.state.arrival || !this.state.departure || !this.state.bay) {
            // Handle the empty field case
            console.log('Please fill in all fields.');
            this.setState({
                formErrors: 'Please fill in all fields.'
            });
            return;
        }
        this.setState({ formErrors: '' }); // Clear the formErrors state if all fields are filled
        this.props.onAddTruck(this.state);
    };

    componentDidUpdate(prevProps) {
        const { status } = this.props.response;
        // Check if the response status changed to "success"
        if (status === 'success' && prevProps.response.status !== 'success') {
            // Clear the form state
            this.setState({
                registration: '',
                arrival: new Date(),
                departure: new Date(),
                bay: '',
            });
        }
    }

  
    render() {
        const { registration, arrival, departure, bay, formErrors } = this.state;
        const { status, message } = this.props.response;

        return (
            <Form onSubmit={this.handleSubmit}>
                {status === 'error' && (
                    <Alert variant="danger">{message}</Alert>
                )}
                <Form.Group controlId="registration">
                    <Form.Label>Registration</Form.Label>
                    <Form.Control
                        type="text"
                        name="registration"
                        value={registration}
                        onChange={(event) => this.handleChange(event.target.value, 'registration')}
                    />
                </Form.Group>
                <Form.Group controlId="arrival">
                    <Form.Label>Arrival</Form.Label>
                    <DatePicker
                        selected={arrival}
                        onChange={(date) => this.handleChange(date, 'arrival')}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd HH:mm"
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group controlId="departure">
                    <Form.Label>Departure</Form.Label>
                    <DatePicker
                        selected={departure}
                        onChange={(date) => this.handleChange(date, 'departure')}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd HH:mm"
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group controlId="bay">
                    <Form.Label>Bay#</Form.Label>
                    <Form.Control
                        type="number"
                        name="bay"
                        min={1}
                        max={12}
                        value={bay}
                        onChange={(event) => this.handleChange(event.target.value, 'bay')}
                    />
                </Form.Group>
                {formErrors && (<Alert variant="danger">{formErrors}</Alert>)}
                <Button variant="primary" type="submit">
                    Add Truck
                </Button>
            </Form>
        );
    }
}

export default TruckForm;
