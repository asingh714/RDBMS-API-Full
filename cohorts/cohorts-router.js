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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id })
    .first()
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res
          .status(404)
          .json({ error: "The cohort with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The cohort with the specified ID could not be retrieved"
      });
    });
});

module.exports = router;
