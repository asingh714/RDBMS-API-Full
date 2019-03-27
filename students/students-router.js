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
              res.status(200).json({
                id: student.id,
                name: student.name,
                cohort: cohort.name
              });
            } else {
              res.status(404).json({
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

router.post("/", (req, res) => {
  const student = req.body;

  if (!student.name) {
    res.status(400).json({ error: "Please provide a name for the student." });
  } else if (!student.cohort_id) {
    res
      .status(400)
      .json({ error: "Please provide a cohort ID for the student." });
  } else {
    db("students")
      .insert(student)
      .then(ids => {
        const id = ids[0];
        db("students")
          .where({ id })
          .first()
          .then(student => {
            res.status(201).json(student);
          })
          .catch(error => {
            res.status(500).json({
              error:
                "There was an error while saving the student to the database."
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
      error: "Please provide a name for the student."
    });
  } else if (!changes.cohort_id) {
    res.status(400).json({
      error: "Please provide a cohort ID for the student."
    });
  } else {
    db("students")
      .where({ id })
      .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res
            .status(404)
            .json({
              error: "The student with the specific ID does not exist."
            });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: "The student information could not be modified."
        });
      });
  }
});

module.exports = router;
