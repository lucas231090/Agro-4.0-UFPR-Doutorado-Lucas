const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authConfig = require('../../config/auth.json');
const User = require('../../models/User');

module.exports = {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
      return response.status(400).send({ error: 'Usuário não existe' });

    if (!(await bcrypt.compare(password, user.password)))
      return response
        .status(401)
        .send({ message: 'Usuário e/ou Senha incorreto(s)' });

    user.password = undefined;

    const { id, name } = user;

    return response.status(200).json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: '30d',
      }),
    });

    /* const token = jwt.sign({ id: user._id }, authConfig.secret, {
      subject: user.id,
      expiresIn: '30d',
    });

    */
    //    response.send({ user, token });
  },
};
