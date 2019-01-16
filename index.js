const express = require("express");
const knex = require("knex");

const knexConfig = require("./knexfile.js")

const server = express();

server.use(express.json());

const db = knex(knexConfig.development);




server.listen(8000, () => console.log("Server up on 8000"));