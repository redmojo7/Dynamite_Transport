import React, { Component } from 'react';
import FleetItem from './FleetItem';

class FleetList extends Component {
    state = {
        fleets: [
            {
                "id": "e23b4a0d-9dd7-4e8f-b7b9-0e580678a8e1",
                "registration": "1ABC123",
                "arrival": "2023-06-01T08:00:00",
                "departure": "",
                "bay": "1"
              },
              {
                "id": "15f8e2a9-32e7-4d8a-b4cd-78fca9e8df2f",
                "registration": "1ABC456",
                "arrival": "2023-06-03T09:15:00",
                "departure": "",
                "bay": "2"
              }
            // Add more fleet objects as needed
        ]
    };

    render() {
        const { fleets } = this.state;

        return (
            <div>
                {fleets.map((fleet) => (
                    <FleetItem key={fleet.id} fleet={fleet} />
                ))}
            </div>
        );
    }
}

export default FleetList;
