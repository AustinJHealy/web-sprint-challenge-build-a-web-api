const express = require('express')

const server = express()
server.use(express.json())

server.get('/', (req, res) => {
    res.send(`<p>Welcome to the unit 4 build sprint API</p>`)
});

module.exports = server;