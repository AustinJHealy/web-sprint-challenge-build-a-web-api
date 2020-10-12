const express = require("express");
const userActions = require("./actions/actionsRouter");
const userProjects = require("./project/projectsRouter");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<p>Welcome to the unit 4 build sprint API</p>`);
});

server.use("/api/actions", userActions);
server.use("/api/projects", userProjects);

module.exports = server;
