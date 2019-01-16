const express = require("express");
const knex = require("knex");

const knexConfig = require("./knexfile.js")

const server = express();

server.use(express.json());

const db = knex(knexConfig.development);


server.get('/', (req, res) => {
    res.send('API IS WORKING');
});


// GET - READ 
server.get("/api/cohorts", (req,res) => {
    db("cohorts")
    .then(cohorts => {
        res.status(200).json(cohorts);
    })
    .catch(err => {
        releaseEvents.status(500).json({ error: "The cohorts could not be retrieved." })
    })
})

// GET - READ with specific ID
server.get("/api/cohorts/:id", (req, res) => {
    const id = req.params.id;

    db("cohorts")
    .where({ id: id })
    .then(cohort => {
        if (cohort) {
            res.status(200).json(cohort)
        } else {
            res.status(404).json({ error: "The cohort with the specified ID was not found."})
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The cohort with the specified ID does not exist." })
    })
})

// POST - ADD 
server.post("/api/cohorts", (req, res) => {
    const cohort = req.body;

    if (!cohort.name) {
        res.status(400).json({
            error: "Please provide a name for the cohort"
          });
    } else {
        db("cohorts")
        .insert(cohort)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({
              error: "There was an error while saving the cohort to the database."
            });
          });
    }
})

// PUT - UPDATE
server.put("/api/cohorts/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    db("cohorts")
    .where({ id: id })
    .update(changes)
    .then(cohort => {
        if (cohort) {
            res.status(200).json(cohort)
        } else {
            res.status(400).json({ error: "Please provide an ID and name for the cohort." })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "The cohort information could not be modified."
        })
    })
})







server.listen(8000, () => console.log("Server up on 8000"));