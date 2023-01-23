const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const FarmSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    fazenda: String,
    cidade: String,
    responsavel: String,
    cultivos: [String],
    bio: String,
    avatar_url: String,
    location: {
      type: PointSchema,
      index: '2dsphere',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

FarmSchema.virtual('avatar').get(function () {
  return `https://apiagro-backend.herokuapp.com/files/${this.avatar_url}`;
});

module.exports = mongoose.model('Farm', FarmSchema);

//  assuntoProblema: String,
//  descricaoProblema: String,
