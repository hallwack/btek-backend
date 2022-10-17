const users = require("express").Router();

const userController = require("../controllers/users.controller");
const {
  userValidator,
  validate,
  paramsUUID,
  paging,
} = require("../middlewares/validation.middleware");

users.get("/", paging, validate, userController.readAllUsers);
users.post("/", userValidator, validate, userController.createUser);
users.get("/:id", paramsUUID, validate, userController.readUserById);
users.put(
  "/:id",
  paramsUUID,
  userValidator,
  validate,
  userController.updateUserById
);
users.delete("/:id", paramsUUID, validate, userController.deleteUserById);

module.exports = users;
