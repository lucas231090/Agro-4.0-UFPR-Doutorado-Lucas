import socketio from 'socket.io-client';

const socket = socketio('http://192.168.25.9:3333', {
  autoConnect: false,
});

function subscribeToNewFarms(subcribeFunction) {
  socket.on('new-farm', subcribeFunction);
}

function connect(latitude, longitude, cultivos) {
  socket.io.opts.query = {
    latitude,
    longitude,
    cultivos,
  };

  socket.connect();
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export {
  connect,
  disconnect,
  subscribeToNewFarms,
};