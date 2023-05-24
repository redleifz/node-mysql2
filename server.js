const express = require("express");
const app = express();
const port = 8000;
const mysql = require("mysql2");
require("dotenv").config();

//mysql2 can fix some issue

const connection = mysql.createConnection({
  host: process.env.MYSQLSERVER, // MySQL server hostname (e.g., 'localhost')
  user: process.env.MYSQLUSERNAME, // MySQL username
  password:  process.env.MYSQLPASSWORD, // MySQL password
  database: process.env.MYSQLDATABASE, // MySQL database name
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL server: ", err);
    return;
  }
  console.log("Connected to MySQL server");
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/employees", (req, res) => {
  // Execute the SQL query to select all rows from the "employee" table
  connection.query("SELECT * FROM employee", (error, results) => {
    if (error) {
      console.error("Error executing query: ", error);
      res.status(500).json({ error: "An error occurred" });
      return;
    }

    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
