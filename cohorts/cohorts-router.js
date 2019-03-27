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

router.post("/", (req, res) => {
  const cohort = req.body;

  if (!cohort.name) {
    res.status(400).json({ error: "Please provide a name for the cohort." });
  } else {
    db("cohorts")
      .insert(cohort)
      .then(ids => {
        const id = ids[0];
        db("cohorts")
          .where({ id })
          .first()
          .then(cohort => {
            res.status(201).json(cohort);
          })
          .catch(error => {
            res.status(500).json({
              error:
                "There was an error while saving the cohort to the database."
            });
          });
      });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!changes.name) {
    res.status(400).json({
      error: "Please provide a name for the cohort."
    });
  } else {
    db("cohorts")
      .where({ id })
      .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res
            .status(404)
            .json({ error: "The cohort with the specific ID does not exist." });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: "The cohort information could not be modified."
        });
      });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({
          message: "The cohort with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The cohort could not be removed."
      });
    });
});

module.exports = router;
