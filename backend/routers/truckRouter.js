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

    const { registration, arrival, bay } = req.body;

    // Check if the registration already exists
    const existingTruck = trucksData.find((t) => t.registration === registration);
    if (existingTruck) {
        return res.status(400).json({ error: 'Registration already exists' });
    }

    // Create a new truck object
    const newTruck = {
        id: uuidv4(),
        registration,
        arrival,
        departure: null,
        bay
    };
    trucksData.unshift(newTruck);

    // Return the new truck
    res.status(201).json(newTruck);
});

// PUT /api/trucks/:id
truckRouter.put('/:id', (req, res) => {
    // Get the truck id from the request params
    const truckId = req.params.id;

    const truck = trucksData.find((t) => t.id === truckId);
    if (!truck) {
        return res.status(404).json({ error: 'Truck not found' });
    }

    // Update the truck data
    const { arrival, departure, registration, bay } = req.body;
    truck.arrival = arrival;
    truck.departure = departure;
    truck.registration = registration;
    truck.bay = bay;

    // If the truck has departed, remove it from the trucksData array and add it to the departedTrucksData array
    if (truck.departure) {
        trucksData.splice(trucksData.indexOf(truck), 1);
        departedTrucksData.unshift(truck);
    }
    // Return the updated trucksData as the response
    res.json(truck);
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
        // Send the deleted truck
        res.json(deletedTruck);
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
        // Send the deleted truck
        res.json(deletedTruck);
    }
    else {
        // If no truck was found with the specified ID, send an error response
        res.status(404).json({ error: 'Truck not found' });
    }
});


module.exports = truckRouter;