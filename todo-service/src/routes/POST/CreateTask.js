require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const db = require("../../config/dbconfig");
const jwt = require("jsonwebtoken");

exports.createtask = async (req, res) => {
  const { subject, description } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!subject || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Task name is required" });
  }

  let createdBy;
  try {
    const decodedToken = jwt.decode(token);
    createdBy = decodedToken.username;
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  const idTask = uuidv4();
  const queryGetLastTaskNumber =
    "SELECT MAX(CAST(SUBSTRING(task_number, 4) AS UNSIGNED)) AS lastTaskNumber FROM task";

  db.query(queryGetLastTaskNumber, (err, rows) => {
    if (err) {
      console.error("Error fetching task number:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch task number" });
    }

    const lastTaskNumber = rows[0]?.lastTaskNumber || 0;
    const newTaskNumber = `AC-${String(lastTaskNumber + 1).padStart(4, "0")}`;
    const status = "todo";
    const queryInsertTask =
      "INSERT INTO task (id_task, subject, description, task_number, created_by, status) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(
      queryInsertTask,
      [idTask, subject, description, newTaskNumber, createdBy, status],
      (err, result) => {
        if (err) {
          console.error("Error inserting task:", err);
          return res
            .status(500)
            .json({ success: false, message: "Failed to create task" });
        }

        return res.status(200).json({
          success: true,
          message: "Task created successfully",
          taskNumber: newTaskNumber,
        });
      }
    );
  });
};
