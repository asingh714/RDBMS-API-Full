const middleware = require("../config/middleware");
const express = require("express");
const server = express();
middleware(server);

const cohortsRouter = require("../cohorts/cohorts-router");

server.use("/api/cohorts", cohortsRouter);

module.exports = server;
