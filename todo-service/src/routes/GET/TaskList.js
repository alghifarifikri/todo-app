const db = require("../../config/dbconfig");

exports.tasklist = async (req, res) => {
  const { status } = req.query;

  if (!status) {
    return res
      .status(400)
      .json({ success: false, message: "Status is required" });
  }

  const query = "SELECT * FROM task WHERE status = ?";

  db.query(query, [status], (err, rows) => {
    if (err) {
      console.error("Error fetching tasks:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch tasks" });
    }

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found for the given status",
      });
    }

    return res.status(200).json({ success: true, data: rows });
  });
};
