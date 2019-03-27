const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

const router = express.Router();

router.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(error => {
      res.status(500).json({ error: "The cohorts could not be retrieved. " });
    });
});

module.exports = router;
