const express = require('express');
const truckRouter = express.Router();
const trucksData = require('../trucks.json');


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

  trucksData.push(truck);
  
  // Return the updated trucksData as the response
  res.json(trucksData);
});

// PUT /api/trucks/:id
truckRouter.put('/:id', (req, res) => {
    // Get the truck id from the request params
    const truckId = req.params.id;
    
    // Return the updated trucksData as the response
  res.json(trucksData);
});


// DELETE /api/trucks/:id
truckRouter.delete('/:id', (req, res) => {
    // Get the truck id from the request params
    const truckId = req.params.id;
    //
    res.json(trucksData);
});




module.exports = truckRouter;