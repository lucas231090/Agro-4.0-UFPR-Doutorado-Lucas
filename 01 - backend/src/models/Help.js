const mongoose = require('mongoose');

const HelpSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },

  assuntoProblema: String,
  descricaoProblema: String,
});

module.exports = mongoose.model('Help', HelpSchema);

//  assuntoProblema: String,
//  descricaoProblema: String,
