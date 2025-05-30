const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Vehicle = require('../models/Vehicle');
const auth = require('../middleware/auth');

// Obter todos os serviços
router.get('/', auth, async (req, res) => {
  try {
    const services = await Service.find()
      .populate({
        path: 'vehicle',
        populate: {
          path: 'owner',
          select: 'name email'
        }
      })
      .sort({ date: -1 });
    
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar serviços' });
  }
});

// Obter serviço por ID
router.get('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate({
        path: 'vehicle',
        populate: {
          path: 'owner',
          select: 'name email'
        }
      });
    
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar serviço' });
  }
});

// Obter serviços por veículo
router.get('/vehicle/:vehicleId', auth, async (req, res) => {
  try {
    const services = await Service.find({ vehicle: req.params.vehicleId })
      .sort({ date: -1 });
    
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar serviços do veículo' });
  }
});

// Criar novo serviço
router.post('/', auth, async (req, res) => {
  try {
    const { vehicle, description, price, status, date, warranty } = req.body;
    
    // Verificar se o veículo existe
    const vehicleExists = await Vehicle.findById(vehicle);
    if (!vehicleExists) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }
    
    const newService = new Service({
      vehicle,
      description,
      price,
      status: status || 'pending',
      date: date || Date.now(),
      warranty: warranty || null
    });
    
    const savedService = await newService.save();
    
    res.status(201).json(savedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar serviço' });
  }
});

// Atualizar serviço
router.put('/:id', auth, async (req, res) => {
  try {
    const { vehicle, description, price, status, date, warranty } = req.body;
    
    // Verificar se o serviço existe
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    
    // Verificar se o veículo existe
    if (vehicle) {
      const vehicleExists = await Vehicle.findById(vehicle);
      if (!vehicleExists) {
        return res.status(404).json({ message: 'Veículo não encontrado' });
      }
    }
    
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        vehicle: vehicle || service.vehicle,
        description: description || service.description,
        price: price || service.price,
        status: status || service.status,
        date: date || service.date,
        warranty: warranty || service.warranty
      },
      { new: true }
    );
    
    res.json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar serviço' });
  }
});

// Excluir serviço
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    
    await Service.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Serviço excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir serviço' });
  }
});

// Obter serviços com garantia próxima do vencimento (30 dias)
router.get('/warranty/ending', auth, async (req, res) => {
  try {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    const services = await Service.find({
      warranty: {
        $gte: today,
        $lte: thirtyDaysFromNow
      }
    })
    .populate({
      path: 'vehicle',
      populate: {
        path: 'owner',
        select: 'name email'
      }
    })
    .sort({ warranty: 1 });
    
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar serviços com garantia próxima do vencimento' });
  }
});

module.exports = router;