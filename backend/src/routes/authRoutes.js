const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const createToken = require("../utils/createToken");
const serializeUser = require("../utils/serializeUser");

const router = express.Router();

router.post("/register", async (request, response) => {
  const name = request.body.name?.trim();
  const email = request.body.email?.trim().toLowerCase();
  const password = request.body.password?.trim();

  if (!name || !email || !password) {
    return response.status(400).json({ message: "Name, email, and password are required." });
  }

  if (password.length < 4) {
    return response.status(400).json({ message: "Password must be at least 4 characters long." });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return response.status(409).json({ message: "An account with this email already exists." });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    passwordHash,
  });
  const token = createToken(user._id.toString());

  return response.status(201).json(serializeUser(user, token));
});

router.post("/login", async (request, response) => {
  const email = request.body.email?.trim().toLowerCase();
  const password = request.body.password?.trim();

  if (!email || !password) {
    return response.status(400).json({ message: "Email and password are required." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return response.status(401).json({ message: "Invalid email or password." });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return response.status(401).json({ message: "Invalid email or password." });
  }

  const token = createToken(user._id.toString());
  return response.json(serializeUser(user, token));
});

router.get("/me", authMiddleware, async (request, response) => {
  const token = request.headers.authorization.split(" ")[1];
  return response.json(serializeUser(request.user, token));
});

module.exports = router;
