const db = require("../data/data");

exports.getStudents = (req, res) => {
  const sql = "SELECT * FROM demo";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json(results);
  });
};

exports.addStudent = (req, res) => {
  const { id, name, dept } = req.body;

  if (!id || !name || !dept) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const sql = "INSERT INTO demo (id, name, dept) VALUES (?, ?, ?)";
  db.query(sql, [id, name, dept], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ error: "Duplicate ID" });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(201).json({ message: "Student added" });
  });
};

exports.updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, dept } = req.body;

  const sql = "UPDATE demo SET name=?, dept=? WHERE id=?";
  db.query(sql, [name, dept, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error" });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Updated" });
  });
};

exports.deleteStudent = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM demo WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error" });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Deleted" });
  });
};
