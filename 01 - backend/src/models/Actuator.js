// DB LIGA DESLIGA LED

const mongoose = require('mongoose');

const ActuatorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  actuator_name: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },

  state: {
    type: String,
    required: true,
    default: 'false',
  },
});

module.exports = mongoose.model('Actuator', ActuatorSchema);
