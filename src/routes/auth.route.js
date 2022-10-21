const { login } = require("../middlewares/login.middleware");
const { validate } = require("../middlewares/validation.middleware");

const auth = require("express").Router();

const { resetPassword } = require("../middlewares/resetPassword.middleware");
const { forgotPassword } = require("../middlewares/forgotPassword.middleware");

auth.post(
  "/login",
  login,
  validate,
  require("../controllers/auth.controller").login
);
auth.post("/register", require("../controllers/auth.controller").register);
auth.post(
  "/forgot-password",
  forgotPassword,
  validate,
  require("../controllers/passwordSettings.controller").forgotPassword
);
auth.post(
  "/reset-password",
  resetPassword,
  validate,
  require("../controllers/passwordSettings.controller").resetPassword
);

module.exports = auth;
