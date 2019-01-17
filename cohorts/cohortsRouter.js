const express = require("express");
const knex = require("knex");
const router = express.Router();
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

// GET - READ
router.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      res.status(500).json({ error: "The cohorts could not be retrieved." });
    });
});

// GET - READ with specific ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db("cohorts")
    .where({ id: id })
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res
          .status(404)
          .json({ error: "The cohort with the specified ID was not found." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The cohort with the specified ID does not exist." });
    });
});

// GET - READ students with a specific ID
router.get("/:id/students", (req, res) => {
  const id = req.params.id;

  db("students")
    .where({ cohort_id: id })
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      releaseEvents
        .status(500)
        .json({ error: "The students could not be retrieved." });
    });
});

// POST - ADD
router.post("/", (req, res) => {
  const cohort = req.body;

  if (!cohort.name) {
    res.status(400).json({
      error: "Please provide a name for the cohort"
    });
  } else {
    db("cohorts")
      .insert(cohort)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the cohort to the database."
        });
      });
  }
});

// PUT - UPDATE
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db("cohorts")
    .where({ id: id })
    .update(changes)
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res
          .status(400)
          .json({ error: "Please provide an ID and name for the cohort." });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The cohort information could not be modified."
      });
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db("cohorts")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ error: "The cohort could not be removed." });
    });
});

module.exports = router;
