const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  serviceType: {
    type: String,
    enum: ['alarm', 'powerWindows', 'centralLock', 'automaticDoors', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  warranty: {
    type: Date,
    default: null
  },
  warrantyPeriod: {
    type: Number,
    default: 90, // Dias de garantia
    min: 0
  },
  technician: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;