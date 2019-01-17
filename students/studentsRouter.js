const express = require("express");
const knex = require("knex");
const router = express.Router();
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

// GET - READ
router.get("/", (req, res) => {
  db("students")
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      res.status(500).json({ error: "The students could not be retrieved." });
    });
});

// GET - READ with specific ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db("students")
    .where({ id: id })
    .then(student => {
      if (student) {
        res.status(200).json({student});
      } else {
        res
          .status(404)
          .json({ error: "The student with the specified ID was not found." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The student with the specified ID does not exist." });
    });
});

// POST - ADD
router.post("/", (req, res) => {
  const student = req.body;

  if (!student.name || !student.cohort_id) {
    res.status(400).json({
      error: "Please provide a name and cohort_id for the student."
    });
  } else {
    db("students")
      .insert(student)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the student to the database."
        });
      });
  }
});

// PUT - UPDATE
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!changes.name || !changes.cohort_id) {
    res
      .status(400)
      .json({ error: "Please provide a cohort ID and name for the student." });
  }

  db("students")
    .where({ id: id })
    .update(changes)
    .then(student => {
      res.status(200).json(student);
    })
    .catch(err => {
      res.status(500).json({
        error: "The student information could not be modified."
      });
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db("students")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ error: "The student could not be removed." });
    });
});

module.exports = router;
