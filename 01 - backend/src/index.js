// yarn start
// yarn dev
// https://apiagro-backend.herokuapp.com/

require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const http = require('http');
const swaggerDocs = require('./swagger.json');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

// const PORT = 3333
// const HOST = "0.0.0.0"

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (request, response) => {
  const sv = server;

  response.send(sv);
});

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

// app.use(cors({origin: .....}))

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(routes);

server.listen(process.env.PORT || 3333);

// server.listen(PORT, HOST);
