require("dotenv").config();
const db = require("../../config/dbconfig");

exports.updatestatus = async (req, res) => {
  const { id_task } = req.params;
  const { status } = req.body;

  if (!["todo", "done", "canceled"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  const query = "UPDATE task SET status = ? WHERE id_task = ?";
  db.query(query, [status, id_task], (err, result) => {
    if (err) {
      console.error("Error update status into database:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error updating status" });
    }
    res.status(201).json({ success: true, message: "Task status updated" });
  });
};
