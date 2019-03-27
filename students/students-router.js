const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

const router = express.Router();

router.get("/", (req, res) => {
  db("students")
    .then(students => {
      res.status(200).json(students);
    })
    .catch(error => {
      res.status(500).json({ error: "The students could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("students")
    .where({ id })
    .first()
    .then(student => {
      if (student) {
        db("cohorts")
          .where({ id: student.cohort_id })
          .first()
          .then(cohort => {
            if (cohort) {
              res
                .status(200)
                .json({
                  id: student.id,
                  name: student.name,
                  cohort: cohort.name
                });
            } else {
              res
                .status(404)
                .json({
                  error: "The cohort with the specified ID does not exist."
                });
            }
          });
      } else {
        res
          .status(404)
          .json({ error: "The student with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The student with the specified ID could not be retrieved."
      });
    });
});

module.exports = router;
