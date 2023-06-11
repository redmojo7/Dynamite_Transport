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

// POST /api/trucks
truckRouter.post('/', (req, res) => {
    const truck = req.body;

    // Check if the registration already exists
    const existingTruck = trucksData.find((t) => t.registration === truck.registration);
    if (existingTruck) {
        return res.status(400).json({ error: 'Registration already exists' });
    }

    truck.id = uuidv4();
    trucksData.push(truck);

    // Return the updated trucksData as the response
    res.json(trucksData);
});

// PUT /api/trucks/:id
truckRouter.put('/:id', (req, res) => {
    // Get the truck id from the request params
    const truckId = req.params.id;
    const truck = trucksData.find((t) => t.id === truckId);
    if (!truck) {
        return res.status(404).json({ error: 'Truck not found' });
    }
    if (truck.departure) {
        departedTrucksData.push(truck);
        trucksData = trucksData.filter((t) => t.id !== truckId);
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


module.exports = truckRouter;