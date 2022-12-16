require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { ROLLBAR_TOKEN } = process.env;
app.use(express.json());
app.use(cors());

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");
//cHANGE STUDENTS TO STUDENT CHK RbLOG THEN FIX BACK STDT(S)

const students = ["Jimmy", "Timothy", "Jimothy"];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/students", (req, res) => {
  rollbar.info("someone got a list of students");
  res.status(200).send(students);
});

app.post("/api/students", (req, res) => {
  let { name } = req.body;

  const index = student.findIndex((student) => {
    return student === name;
  });

  try {
    if (index === -1 && name !== "") {
      students.push(name);
      rollbar.info("new student added");
      res.status(200).send(students);
    } else if (name === "") {
      rollbar.error("someone tried to enter a blank student");
      res.status(400).send("You must enter a name.");
    } else {
      rollbar.error(`student already exists`);
      res.status(400).send("That student already exists.");
    }
  } catch (err) {
    rollbar.error(err);
    console.log(err);
  }
});

app.delete("/api/students/:index", (req, res) => {
  const targetIndex = +req.params.index;
  rollbar.critical(`someone deleted ${students[targetIndex]}`);
  students.splice(targetIndex, 1);
  res.status(200).send(students);
});

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server listening on ${port}`));

///////////NP repeat///////////////////
/*require('dotenv').config()
express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const {ROLLBAR_TOKEN} = process.env
app.use(express.json());
app.use(cors());

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to RollbaR
rollbar.log("Hello world!");
const students = ["Jimmy", "Timothy", "Jimothy"];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/api/students", (req, res) => {
  res.status(200).send(students);
});
app.get("/api/students", (req, res) => {
  rollbar.info("Someone got the list of students on page load");
  res.status(200).send(students);
});
app.post("/api/students", (req, res) => {
  let { name } = req.body;

  const index = students.findIndex((student) => {
    return student === name;
  });

  try {
    if (index === -1 && name !== "") {
      students.push(name);
      rollbar.info("Someone added a student");
      res.status(200).send(students);
    } else if (name === "") {
      rollbar.error("Someone tried to enter a blank student");
      res.status(400).send("You must enter a name.");
    } else {
      rollbar.error("Someone tried to enter a duplicate student name");
      res.status(400).send("That student already exists.");
    }
  } catch (err) {
    console.log(err);
    rollbar.error(err);
  }
});

app.delete("/api/students/:index", (req, res) => {
  const targetIndex = +req.params.index;

  students.splice(targetIndex, 1);
  res.status(200).send(students);
});

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server listening on ${port}`));
*/
