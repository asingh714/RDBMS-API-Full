const middleware = require("../config/middleware");
const express = require("express");
const server = express();
middleware(server);

const cohortsRouter = require("../cohorts/cohorts-router");
const studentsRouter = require("../students/students-router");


server.use("/api/cohorts", cohortsRouter);
server.use("/api/students", studentsRouter);


module.exports = server;
