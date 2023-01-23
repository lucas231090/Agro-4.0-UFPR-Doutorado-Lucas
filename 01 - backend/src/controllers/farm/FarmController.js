/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
// não é o meu

// const axios = require('axios');
// const { request, response } = require('express');

const Farm = require('../../models/Farm');
const User = require('../../models/User');
const parseStringAsArray = require('../../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../../websocket');

module.exports = {
  // listagem de todas as fazendas fazendas

  async index(request, response) {
    const farms = await Farm.find();

    return response.json(farms);
  },

  // cadastro de fazendas

  async store(request, response) {
    const { filename } = request.file;

    const { fazenda, cidade, responsavel, cultivos, bio, latitude, longitude } =
      request.body;

    const { user_id } = request.headers;

    let farm = await Farm.findOne({ fazenda });

    if (!farm) {
      const cultivosArray = parseStringAsArray(cultivos);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      farm = await Farm.create({
        user: user_id,
        fazenda,
        cidade,
        responsavel,
        cultivos: cultivosArray,
        bio,
        avatar_url: filename,
        location,
      });

      // eslint-disable-next-line no-console
      console.log(request.file);

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        cultivosArray
      );

      sendMessage(sendSocketMessageTo, 'new-farm ', farm);
    } else
      response.status(400).send({
        error: 'Essa fazenda já está cadastrada',
      });

    return response.status(200).json(farm);
  },

  // eslint-disable-next-line no-shadow
  async update(request, response) {
    const { filename } = request.file;
    // eslint-disable-next-line camelcase
    const { farm_id } = request.params;
    const { fazenda, cidade, responsavel, cultivos, bio, latitude, longitude } =
      request.body;
    // eslint-disable-next-line camelcase
    const { user_id } = request.headers;

    const cultivosArray = parseStringAsArray(cultivos);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const user = await User.findById(user_id);
    const farms = await Farm.findById(farm_id);

    // eslint-disable-next-line no-underscore-dangle
    if (String(user._id) !== String(farms.user)) {
      return response.status(401).json({ error: 'Não autorizado' });
    }

    await Farm.updateOne(
      { _id: farm_id },
      {
        user: user_id,
        fazenda,
        cidade,
        responsavel,
        cultivos: cultivosArray,
        bio,
        avatar_url: filename,
        location,
      }
    );

    return response.send({ message: 'Fazenda atualizada com sucesso!!!' });
  },

  async destroy(request, response) {
    const { farm_id } = request.body;
    const { user_id } = request.headers;

    const user = await User.findById(user_id);
    const farms = await Farm.findById(farm_id);

    if (String(user._id) !== String(farms.user)) {
      return response.status(401).json({ error: 'Não autorizado' });
    }

    await Farm.findByIdAndDelete({ _id: farm_id });

    return response.json({ message: 'Fazenda excluida com sucesso' });
  },
};
