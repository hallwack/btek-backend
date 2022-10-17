const users = require("express").Router();

const userController = require("../controllers/users.controller");
const {
  userValidator,
  validate,
} = require("../middlewares/validation.middleware");

users.get("/", userController.readAllUsers);
users.post("/", userValidator, validate, userController.createUser);
users.get("/:id", userController.readUserById);
users.put("/:id", userValidator, validate, userController.updateUserById);
users.delete("/:id", userController.deleteUserById);

module.exports = users;
