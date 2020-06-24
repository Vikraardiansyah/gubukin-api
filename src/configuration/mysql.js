const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gubukin",
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("Database has connected...");
});

module.exports = connection;
