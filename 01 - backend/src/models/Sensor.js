// DB sensores

const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  user_id: String,
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  tipoMedida1: String,
  tipoMedida2: String,
  unidadeMedida1: String,
  unidadeMedida2: String,
  modeloSensor: String,
  valor1: Number,
  valor2: Number,
  ipArduino: String,
});

module.exports = mongoose.model('Sensores', SensorSchema);
