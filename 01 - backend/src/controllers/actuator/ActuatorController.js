const Actuator = require('../../models/Actuator');
const { sendSocketCommand } = require('../../websocket');
// const User = require('../../models/User');

module.exports = {
  async active(request, response) {
    //

    const { actuator_name, timestamp } = request.body;
    const { user_id } = request.headers;

    if (!user_id) {
      return response.status(401).json({
        error: 'Unauthorized: Actuator needs a linked user',
      });
    }

    if (!actuator_name) {
      return response.status(401).json({
        error: 'Unauthorized: Actuator needs a name',
      });
    }

    const actuator = await Actuator.findOne({ actuator_name });

    if (!actuator) {
      await Actuator.create({
        user: user_id,
        actuator_name,
        timestamp,
      });
    } else
      response
        .status(401)
        .send({ error: 'This actuator is already registered' });

    return response
      .status(200)
      .json({ message: `The ${actuator_name} was successfully registered` });
  },

  async index(request, response) {
    const actuator = await Actuator.find();

    return response.json(actuator);
  },

  async update(request, response) {
    const { actuator_id } = request.params;
    const { state } = request.body;
    const { user_id } = request.headers;

    // const user = await User.findById(user_id);
    const actuators = await Actuator.findById(actuator_id);

    if (!user_id) {
      return response.status(401).json({
        error:
          'Não autorizado: não existe usuário criado para controlar atuador',
      });
    }

    if (String(user_id) !== String(actuators.user)) {
      return response.status(401).json({
        error:
          'Não autorizado: O usuário não está permitido para controlar o atuador',
      });
    }

    await Actuator.updateOne(
      { _id: actuator_id },
      {
        user: user_id,
        state,
      }
    );

    sendSocketCommand(state);

    console.log(state);

    return response.json({
      state: 'Status do atuador atualizado com sucesso!',
    });

    //
  },
};
