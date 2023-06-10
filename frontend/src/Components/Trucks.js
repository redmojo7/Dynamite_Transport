import React, { Component } from 'react';

class Truck extends Component {
  render() {
    const { truck } = this.props;
    return (
      <div className="truck-item">
        <p><strong>Registration:</strong> {truck.registration}</p>
        <p><strong>Arrival:</strong> {truck.arrival}</p>
        <p><strong>Departure:</strong> {truck.departure}</p>
        <p><strong>Bay:</strong> {truck.bay}</p>
        <hr />
      </div>
    );
  }
}

class Trucks extends Component {
  render() {
    const { trucks } = this.props;
    return (
      <div>
        {trucks.map((truck, index) => (
          <Truck key={index} truck={truck} />
        ))}
      </div>
    );
  }
}

export default Trucks;