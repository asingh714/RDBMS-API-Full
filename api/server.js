const express = require("express");

const middleware = require("../config/middleware")

const server = express();

middleware(server);

module.exports = server;