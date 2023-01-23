/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
// const { request, response } = require('express');

const {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  startOfToday,
  endOfToday,
} = require('date-fns');

const Farm = require('../../models/Farm');
const User = require('../../models/User');
const Sensor = require('../../models/Sensor');

const current = new Date();

module.exports = {
  // chamar todas as fazendas
  async index(request, response) {
    const farms = await Farm.find();

    return response.json(farms);
  },

  // listagem com filtro por cultivos

  async indexCultivo(request, response) {
    const { cultivos } = request.query;

    const farms = await Farm.find({ cultivos });

    return response.json(farms);
  },

  // listagem com filtro por cidade

  async indexCidade(request, response) {
    const { cidade } = request.query;

    const farms = await Farm.find({ cidade });

    return response.json(farms);
  },

  /// ////////////////////////////////////
  // LISTAGEM DOS INDICADORESSSSSS  ////////
  /// ///////////////////////////////////
  // listagem temporal dos indicadores
  // HOJE

  async indextoday(request, response) {
    const { user_id } = request.headers;

    const user = await User.findById(user_id);

    const sensores = await Sensor.find({
      user,
      timestamp: { $gte: startOfDay(current), $lte: endOfDay(current) },
    }).sort('when');

    return response.json(sensores);
  },

  async indexyesterday(request, response) {
    const { user_id } = request.headers;

    const user = await User.findById(user_id);

    const sensores = await Sensor.find({
      user,
      timestamp: { $gte: startOfDay(current), $lte: endOfDay(current) },
    }).sort('when');

    return response.json(sensores);
  },

  async indexweek(request, response) {
    const { user_id } = request.headers;

    const user = await User.findById(user_id);

    const sensores = await Sensor.find({
      user,
      timestamp: { $gte: startOfWeek(current), $lte: endOfWeek(current) },
    }).sort('when');
    return response.status(200).json(sensores);
  },

  async indexmonth(request, response) {
    const { user_id } = request.headers;

    const user = await User.findById(user_id);

    const sensores = await Sensor.find({
      user,
      timestamp: { $gte: startOfMonth(current), $lte: endOfMonth(current) },
    }).sort('when');
    return response.status(200).json(sensores);
  },

  async indexyear(request, response) {
    const { user_id } = request.headers;

    const user = await User.findById(user_id);

    const sensores = await Sensor.find({
      user,
      timestamp: { $gte: startOfYear(current), $lte: endOfYear(current) },
    });
    return response.status(200).json(sensores);
  },
};
