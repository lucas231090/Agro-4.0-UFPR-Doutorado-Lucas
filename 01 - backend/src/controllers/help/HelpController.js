const {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} = require('date-fns');

const Help = require('../../models/Help');
const User = require('../../models/User');

const current = new Date();

module.exports = {
  // filtrando os help por usuário

  async index(request, response) {
    const helps = await Help.find();

    return response.json(helps);
  },

  async store(request, response) {
    const { assuntoProblema, descricaoProblema } = request.body;

    // ta vinculando o ID do cara que ta fazendo login com o assunto problema dele
    const { user_id } = request.headers;

    helps = await Help.create({
      user: user_id,
      assuntoProblema,
      descricaoProblema,
    });

    return response.json({ helps });
  },

  async indexweek(request, response) {
    const { user_id } = request.headers;

    const user = await User.findById(user_id);

    const help = await Help.find({
      user,
      timestamp: { $gte: startOfWeek(current), $lte: endOfWeek(current) },
    }).sort('when');
    return response.status(200).json(help);
  },

  async indexmonth(request, response) {
    const { user_id } = request.headers;

    const user = await User.findById(user_id);

    const help = await Help.find({
      user,
      timestamp: { $gte: startOfMonth(current), $lte: endOfMonth(current) },
    }).sort('when');
    return response.status(200).json(help);
  },

  async indexyear(request, response) {
    const { user_id } = request.headers;

    const user = await User.findById(user_id);

    const help = await Help.find({
      user,
      timestamp: { $gte: startOfYear(current), $lte: endOfYear(current) },
    }).sort('when');
    return response.status(200).json(help);
  },
};
