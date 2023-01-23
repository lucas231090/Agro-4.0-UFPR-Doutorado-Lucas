/* eslint-disable no-unused-expressions */
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = async (request, response, next) => {
  const authHeader = request.headers.authorization;

  // console.log(authHeader);

  if (!authHeader) {
    return response.status(401).json({ error: 'Token não existe' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret);

    request.userId = decoded.id;

    // console.log(decoded);

    return next();
  } catch (err) {
    return response.status(401).json({ error: 'Token invalido' });
  }
};
