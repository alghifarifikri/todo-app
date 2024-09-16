const db = require("../../config/dbconfig");

exports.deletetask = async (req, res) => {
  const { id_task } = req.params;
  const query = "DELETE FROM task WHERE id_task = ?";

  db.query(query, [id_task], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error deleting task" });
    }
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  });
};
