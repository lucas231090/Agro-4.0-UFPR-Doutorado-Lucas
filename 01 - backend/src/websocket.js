const socketio = require('socket.io');

// const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
  io = socketio(server);

  io.on('connection', (socket) => {
    //
    console.log(`${new Date()} Usuário conectado: ${socket.id}`);

    socket.emit('Connection Sucefull', 'Hi, you are connected with server!');

    // const { latitude, longitude, cultivos } = socket.handshake.query;
    const { latitude, longitude } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      //   cultivos: parseStringAsArray(cultivos),
    });

    socket.on('disconnect', () => {
      console.log(`${new Date()} Usuário desconectado: ${socket.id}`);
    });
  });
};

// eslint-disable-next-line max-len
exports.findConnections = (coordinates, cultivos) =>
  connections.filter(
    (connection) =>
      calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.cultivos.some((item) => cultivos.includes(item))
  );

exports.sendMessage = (to, message, data) => {
  to.forEach((connection) => {
    io.to(connection.id).emit(message, data);
  });
};

exports.sendSocketCommand = (data) => {
  io.emit(data);
};
