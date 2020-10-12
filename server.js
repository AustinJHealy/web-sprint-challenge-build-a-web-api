const express = require('express');
const userActions = require('./actions/actionsRouter');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<p>Welcome to the unit 4 build sprint API</p>`)
});

server.use('/api/actions', userActions);

module.exports = server;