// const {startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, = require('date-fns');

const Notification = require('../../models/Notification');
// const User = require('../../models/User');

// const current = new Date();

module.exports = {
  // filtrando os help por usuário

  async index(request, response) {
    const notification = await Notification.find();

    return response.json(notification);
  },

  async store(request, response) {
    const { content } = request.body;
    const { user_id } = request.headers;

    notification = await Notification.create({
      user: user_id,
      content,
    });

    return response.status(200).json({ notification });
  },
};
