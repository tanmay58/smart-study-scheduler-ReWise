const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, auth denied" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Always attach user as object
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
