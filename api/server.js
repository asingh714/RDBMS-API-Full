const express = require("express");
const knex = require("knex");

const middleware = require("../config/middleware");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

const server = express();

middleware(server);





module.exports = server;
