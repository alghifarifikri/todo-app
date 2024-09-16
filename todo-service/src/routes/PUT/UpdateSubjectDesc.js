require("dotenv").config();
const db = require("../../config/dbconfig");

exports.updatesubjectdesc = async (req, res) => {
  const { id_task } = req.params;
  const { subject, description } = req.body;

  if (!subject && !description) {
    return res
      .status(400)
      .json({ success: false, message: "No updates provided" });
  }

  let query = "UPDATE task SET";
  const queryParams = [];

  if (subject) {
    query += " subject = ?";
    queryParams.push(subject);
  }

  if (description) {
    if (subject) query += ", ";
    query += " description = ?";
    queryParams.push(description);
  }

  query += " WHERE id_task = ?";
  queryParams.push(id_task);

  db.query(query, queryParams, (err, result) => {
    if (err) {
      console.error("Error updating task:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error updating task" });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task updated successfully" });
  });
};
