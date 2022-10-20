const { login } = require("../middlewares/login.middleware");
const { validate } = require("../middlewares/validation.middleware");

const auth = require("express").Router();

auth.post(
  "/login",
  login,
  validate,
  require("../controllers/auth.controller").login
);
auth.post("/register", require("../controllers/auth.controller").register);

module.exports = auth;
