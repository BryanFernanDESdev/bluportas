const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    trim: true
  },
  chassis: {
    type: String,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  installedDevices: {
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

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;