const router = require("express").Router();
const { auth } = require("../util/middleware");

const loginUser = require("./POST/Login").login;
const registerUser = require("./POST/register").register;
const createTask = require("./POST/CreateTask").createtask;
const listTask = require("./GET/TaskList").tasklist;
const updateStatus = require("./PUT/UpdateStatus").updatestatus;
const updateSubjectDesc = require("./PUT/UpdateSubjectDesc").updatesubjectdesc;
const deleteTask = require("./DELETE/DeleteTask").deletetask;

router.get("/task", auth, listTask);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/task", auth, createTask);
router.put("/task/status/:id_task", auth, updateStatus);
router.put("/task/subject-description/:id_task", auth, updateSubjectDesc);
router.delete("/task/:id_task", auth, deleteTask);

module.exports = router;
