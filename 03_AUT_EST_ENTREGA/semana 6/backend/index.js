const express = require("express");
const app = express();

// server settings

// listen in all network cards (access it at localhost:80)
const hostname = "0.0.0.0";
const port = 5000;

// loads sqlite3 database
const sqlite3 = require("sqlite3").verbose();
const DBPATH = "database.db";

// shows frontend
app.use(express.static("../frontend/"));

// use json as middleware
app.use(express.json());

// endpoints

// returns the workExperience list
app.get("/workExperience", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  let db = new sqlite3.Database(DBPATH);
  let sql = "SELECT * FROM workExperience ORDER BY startDate";
  let params = [];

  db.all(sql, params, (err, rows) => {
    if (err) {
      throw err;
    }

    // response
    res.json({ workExperiences: rows });
  });
  db.close();
});

// returns the studyExperience list
app.get("/studyExperience", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  let db = new sqlite3.Database(DBPATH);
  let sql = "SELECT * FROM studyExperience ORDER BY startDate";
  let params = [];

  db.all(sql, params, (err, rows) => {
    if (err) {
      throw err;
    }

    // response
    res.json({ studyExperiences: rows });
  });
  db.close();
});




// starts the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
