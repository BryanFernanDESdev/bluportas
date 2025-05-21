const express = require('express');
const Service = require('../models/Service');
const Vehicle = require('../models/Vehicle');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all services
router.get('/', auth, async (req, res) => {
  try {
    // Find all vehicles owned by the user
    const vehicles = await Vehicle.find({ owner: req.user._id });
    const vehicleIds = vehicles.map(vehicle => vehicle._id);
    
    // Find all services for these vehicles
    const services = await Service.find({ vehicle: { $in: vehicleIds } })
      .populate('vehicle');
    
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get service by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('vehicle');
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Check if the service belongs to a vehicle owned by the user
    const vehicle = await Vehicle.findOne({ 
      _id: service.vehicle._id, 
      owner: req.user._id 
    });
    
    if (!vehicle) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new service
router.post('/', auth, async (req, res) => {
  try {
    // Check if the vehicle belongs to the user
    const vehicle = await Vehicle.findOne({ 
      _id: req.body.vehicle, 
      owner: req.user._id 
    });
    
    if (!vehicle) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const service = new Service(req.body);
    await service.save();
    
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update service
router.put('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Check if the service belongs to a vehicle owned by the user
    const vehicle = await Vehicle.findOne({ 
      _id: service.vehicle, 
      owner: req.user._id 
    });
    
    if (!vehicle) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'status', 'price', 'date'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }
    
    updates.forEach(update => service[update] = req.body[update]);
    await service.save();
    
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete service
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Check if the service belongs to a vehicle owned by the user
    const vehicle = await Vehicle.findOne({ 
      _id: service.vehicle, 
      owner: req.user._id 
    });
    
    if (!vehicle) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;