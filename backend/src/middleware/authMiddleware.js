const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authMiddleware(request, response, next) {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return response.status(401).json({ message: "Authentication required." });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId).select("-passwordHash");

    if (!user) {
      return response.status(401).json({ message: "User session is no longer valid." });
    }

    request.user = user;
    return next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid or expired token." });
  }
}

module.exports = authMiddleware;
