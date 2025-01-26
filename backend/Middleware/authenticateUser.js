const jwt = require("jsonwebtoken");

exports.authenticateUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];
    
  console.log('token', token);

  const secreteKey = process.env.SECRET_KEY;

  try {
    const user = jwt.verify(token, secreteKey);

    req.userId = user.userId;
    console.log("Authenticated User ID:", user.userId);

    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
