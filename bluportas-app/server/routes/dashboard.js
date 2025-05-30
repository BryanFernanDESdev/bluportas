const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Obter estatísticas para o dashboard
router.get('/stats', auth, async (req, res) => {
  try {
    // Contar serviços por tipo
    const alarmsCount = await Service.countDocuments({ 
      description: { $regex: /alarme/i } 
    });
    
    // Total de serviços
    const servicesCount = await Service.countDocuments();
    
    // Agendamentos pendentes
    const pendingCount = await Service.countDocuments({ 
      status: 'pending' 
    });
    
    // Garantias a vencer nos próximos 30 dias
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    const warrantiesCount = await Service.countDocuments({
      warranty: {
        $gte: today,
        $lte: thirtyDaysFromNow
      }
    });
    
    res.json({
      alarmes: alarmsCount,
      servicos: servicesCount,
      agendamentos: pendingCount,
      garantias: warrantiesCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar estatísticas' });
  }
});

// Obter serviços recentes
router.get('/recent-services', auth, async (req, res) => {
  try {
    const recentServices = await Service.find()
      .populate({
        path: 'vehicle',
        populate: {
          path: 'owner',
          select: 'name'
        }
      })
      .sort({ date: -1 })
      .limit(5);
    
    // Formatar os dados para o frontend
    const formattedServices = recentServices.map(service => ({
      id: service._id,
      client: service.vehicle.owner.name,
      vehicle: `${service.vehicle.brand} ${service.vehicle.model} ${service.vehicle.plate}`,
      service: service.description,
      date: service.date,
      status: service.status
    }));
    
    res.json(formattedServices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar serviços recentes' });
  }
});

// Obter próximos agendamentos
router.get('/upcoming-appointments', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const upcomingServices = await Service.find({
      status: 'pending',
      date: { $gte: today, $lte: nextWeek }
    })
    .populate({
      path: 'vehicle',
      populate: {
        path: 'owner',
        select: 'name'
      }
    })
    .sort({ date: 1 })
    .limit(5);
    
    // Formatar os dados para o frontend
    const appointments = upcomingServices.map(service => {
      const serviceDate = new Date(service.date);
      let timeText;
      
      if (serviceDate.toDateString() === today.toDateString()) {
        timeText = `Hoje ${serviceDate.getHours()}:${String(serviceDate.getMinutes()).padStart(2, '0')}`;
      } else if (serviceDate.toDateString() === tomorrow.toDateString()) {
        timeText = `Amanhã ${serviceDate.getHours()}:${String(serviceDate.getMinutes()).padStart(2, '0')}`;
      } else {
        timeText = `${serviceDate.toLocaleDateString('pt-BR')} ${serviceDate.getHours()}:${String(serviceDate.getMinutes()).padStart(2, '0')}`;
      }
      
      return {
        title: service.description,
        vehicle: `${service.vehicle.brand} ${service.vehicle.model} - ${service.vehicle.plate}`,
        client: service.vehicle.owner.name,
        time: timeText
      };
    });
    
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar próximos agendamentos' });
  }
});

module.exports = router;