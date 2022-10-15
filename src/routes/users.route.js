const users = require("express").Router();

const userController = require("../controllers/users.controller");
const checkMiddleware = require("../middlewares/check.middleware")

users.get("/", userController.readAllUsers);
users.post("/", userController.createUser);
users.get("/:id", userController.readUserById);

module.exports = users;
