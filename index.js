const express = require("express");

const cohortsRouter = require("./cohorts/cohortsRouter");
const studentsRouter = require("./students/studentsRouter");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("API IS WORKING");
});

server.use("/api/cohorts", cohortsRouter);
server.use("/students", studentsRouter);

server.listen(8000, () => console.log("Server up on 8000"));
