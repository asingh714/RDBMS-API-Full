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
        res.status(200).json(student);
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

module.exports = router;
