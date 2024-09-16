const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    return res
      .status(401)
      .json({ success: false, message: "Token tidak tersedia, akses ditolak" });
  }

  jwt.verify(token, process.env.APP_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Token tidak valid, akses ditolak" });
    }

    req.user = user;
    next();
  });
};

module.exports = { auth };
