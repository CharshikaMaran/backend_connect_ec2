

const mysql = require("mysql2");
const createConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Charshi@2025",
    database: "demo"
});

createConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  } else {
    console.log("Connected to the database.");
  }
});

module.exports = createConnection;