const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const Service = require('../models/Service');
const auth = require('../middleware/auth');

// Obter todos os veículos
router.get('/', auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar veículos' });
  }
});

// Obter veículo por ID
router.get('/:id', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .populate('owner', 'name email');
    
    if (!vehicle) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }
    
    res.json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar veículo' });
  }
});

// Obter veículos por proprietário
router.get('/owner/:ownerId', auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ owner: req.params.ownerId })
      .sort({ createdAt: -1 });
    
    res.json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar veículos do proprietário' });
  }
});

// Criar novo veículo
router.post('/', auth, async (req, res) => {
  try {
    const { plate, model, brand, year, owner, color, chassis, installedDevices, notes } = req.body;
    
    // Verificar se já existe um veículo com a mesma placa
    const existingVehicle = await Vehicle.findOne({ plate: plate.toUpperCase() });
    if (existingVehicle) {
      return res.status(400).json({ message: 'Já existe um veículo com esta placa' });
    }
    
    const newVehicle = new Vehicle({
      plate: plate.toUpperCase(),
      model,
      brand,
      year,
      owner,
      color,
      chassis,
      installedDevices,
      notes
    });
    
    const savedVehicle = await newVehicle.save();
    
    res.status(201).json(savedVehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar veículo' });
  }
});

// Atualizar veículo
router.put('/:id', auth, async (req, res) => {
  try {
    const { plate, model, brand, year, owner, color, chassis, installedDevices, notes } = req.body;
    
    // Verificar se o veículo existe
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }
    
    // Se a placa foi alterada, verificar se já existe outro veículo com a nova placa
    if (plate && plate.toUpperCase() !== vehicle.plate) {
      const existingVehicle = await Vehicle.findOne({ plate: plate.toUpperCase() });
      if (existingVehicle) {
        return res.status(400).json({ message: 'Já existe um veículo com esta placa' });
      }
    }
    
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      {
        plate: plate ? plate.toUpperCase() : vehicle.plate,
        model: model || vehicle.model,
        brand: brand || vehicle.brand,
        year: year || vehicle.year,
        owner: owner || vehicle.owner,
        color: color !== undefined ? color : vehicle.color,
        chassis: chassis !== undefined ? chassis : vehicle.chassis,
        installedDevices: installedDevices !== undefined ? installedDevices : vehicle.installedDevices,
        notes: notes !== undefined ? notes : vehicle.notes
      },
      { new: true }
    );
    
    res.json(updatedVehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar veículo' });
  }
});

// Excluir veículo
router.delete('/:id', auth, async (req, res) => {
  try {
    // Verificar se o veículo existe
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }
    
    // Verificar se existem serviços associados ao veículo
    const services = await Service.find({ vehicle: req.params.id });
    if (services.length > 0) {
      return res.status(400).json({ 
        message: 'Não é possível excluir o veículo pois existem serviços associados a ele',
        servicesCount: services.length
      });
    }
    
    await Vehicle.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Veículo excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir veículo' });
  }
});

// Buscar veículo por placa
router.get('/search/plate/:plate', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ 
      plate: req.params.plate.toUpperCase() 
    }).populate('owner', 'name email');
    
    if (!vehicle) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }
    
    res.json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar veículo' });
  }
});

module.exports = router;