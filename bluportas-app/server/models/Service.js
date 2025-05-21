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
  }
}, {
  timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;