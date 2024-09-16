require("dotenv").config();
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const db = require("../../config/dbconfig");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Username, Email and password are required",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const id_user = uuidv4();

    const query =
      "INSERT INTO user (id_user, username, email, password) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [id_user, username, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Error inserting user into database:", err);
          return res
            .status(500)
            .json({ success: false, message: "Error creating user" });
        }
        res
          .status(201)
          .json({ success: true, message: "User registered successfully!" });
      }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
