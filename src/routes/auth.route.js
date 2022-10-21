const { login } = require("../middlewares/login.middleware");
const { validate } = require("../middlewares/validation.middleware");

const auth = require("express").Router();

const authMiddleware = require("../middlewares/auth.middleware");

auth.post(
  "/login",
  login,
  validate,
  require("../controllers/auth.controller").login
);
auth.post("/register", require("../controllers/auth.controller").register);
auth.post(
  "/forgot-password",
  authMiddleware,
  require("../controllers/passwordSettings.controller").forgotPassword
);
auth.post("/reset-password");

module.exports = auth;
