const users = require("express").Router();

const userController = require("../controllers/users.controller");
const {
  userValidation,
  validate,
} = require("../middlewares/validation.middleware");

users.get("/", userController.readAllUsers);
users.post("/", userValidation(), validate, userController.createUser);
users.get("/:id", userController.readUserById);
users.put("/:id", userValidation(), validate, userController.updateUserById);
users.delete("/:id", userController.deleteUserById);

module.exports = users;
