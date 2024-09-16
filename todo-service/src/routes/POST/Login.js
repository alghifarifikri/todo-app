require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const db = require("../../config/dbconfig");

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "email and password are required" });
  }

  const queryUser = "SELECT * FROM user WHERE email = ?";
  db.query(queryUser, [email], async (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error fetching user" });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const user = results[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id_user: user.id_user,
        email: user.email,
        username: user.username,
      },
      process.env.APP_KEY,
      { expiresIn: "1h" }
    );

    const tokenId = uuidv4();
    const queryToken =
      "INSERT INTO revoke_token (id_token, token, revoked) VALUES (?, ?, ?)";
    db.query(queryToken, [tokenId, token, 0], (err, result) => {
      if (err) {
        console.error("Error inserting token:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error saving token" });
      }

      res.status(200).json({ success: true, auth: token });
    });
  });
};
