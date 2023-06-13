const express = require('express');
const truckRouter = express.Router();
const trucksData = require('../public/trucks.json');
const departedTrucksData = require('../public/departedTrucks.json');
const { v4: uuidv4 } = require('uuid');

// GET /api/trucks
truckRouter.get('/', (req, res) => {
    // Return the trucks data as JSON response
    res.json(trucksData);
});

// GET /api/trucks
truckRouter.get('/departed', (req, res) => {
    // Return the departed trucks data as JSON response
    res.json(departedTrucksData);
});

// POST /api/trucks
truckRouter.post('/', (req, res) => {
    const truck = req.body;

    // Check if the registration already exists
    const existingTruck = trucksData.find((t) => t.registration === truck.registration);
    if (existingTruck) {
        return res.status(400).json({ error: 'Registration already exists' });
    }

    truck.id = uuidv4();
    trucksData.unshift(truck);

    // Return the updated trucksData as the response
    res.status(201).json(trucksData);
});

// PUT /api/trucks/:id
truckRouter.put('/:id', (req, res) => {
    // Get the truck id from the request params
    const truckId = req.params.id;
    // Get the updated truck data from the request body
    const updatedTruckData = req.body;

    const truck = trucksData.find((t) => t.id === truckId);
    if (!truck) {
        return res.status(404).json({ error: 'Truck not found' });
    }

    // Update the truck data
    truck.registration = updatedTruckData.registration;
    truck.arrival = updatedTruckData.arrival;
    truck.bay = updatedTruckData.bay;
    // Update the departure field if provided in the updatedTruckData
    if (updatedTruckData.departure) {
        truck.departure = updatedTruckData.departure;
    }

    // If the truck has departed, remove it from the trucksData array and add it to the departedTrucksData array
    if (truck.departure) {
        trucksData.splice(trucksData.indexOf(truck), 1);
        departedTrucksData.unshift(truck);
    }

    // Return the updated trucksData as the response
    res.json(trucksData);
});



// DELETE /api/trucks/:id
truckRouter.delete('/:id', (req, res) => {
    // Get the truck id from the request params
    const truckId = req.params.id;
    // Find the index of the truck with the specified ID in the trucksData array
    const deletedTruckIndex = trucksData.findIndex((truck) => truck.id === truckId);

    if (deletedTruckIndex !== -1) {
        // Remove the truck from the trucksData array
        const deletedTruck = trucksData.splice(deletedTruckIndex, 1)[0];
        console.log('Deleting truck:', deletedTruck);
        // Send the updated trucksData as the response
        res.json(trucksData);
    } else {
        // If no truck was found with the specified ID, send an error response
        res.status(404).json({ error: 'Truck not found' });
    }
});

// DELETE /api/trucks/departed/:id
truckRouter.delete('/departed/:id', (req, res) => {
    // Get the truck id from the request params
    const truckId = req.params.id;
    // Find the index of the truck with the specified ID in the departedTrucksData array
    const deletedTruckIndex = departedTrucksData.findIndex((truck) => truck.id === truckId);
    if (deletedTruckIndex !== -1) {
        // Remove the truck from the departedTrucksData array
        const deletedTruck = departedTrucksData.splice(deletedTruckIndex, 1)[0];
        console.log('Deleting truck:', deletedTruck);
        // Send the updated departedTrucksData as the response
        res.json(departedTrucksData);
    }
    else {
        // If no truck was found with the specified ID, send an error response
        res.status(404).json({ error: 'Truck not found' });
    }
});


module.exports = truckRouter;