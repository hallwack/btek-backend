const users = require("express").Router();

const userController = require("../controllers/users.controller");
const { addUser } = require("../middlewares/addUser.middleware");
const { getAllParams } = require("../middlewares/getAllParams.middleware");
const { pagination } = require("../middlewares/pagination.middleware");
const {
  validate,
} = require("../middlewares/validation.middleware");

users.get("/", pagination, validate, userController.readAllUsers);
users.post("/", addUser, validate, userController.createUser);
users.get("/:id", getAllParams, validate, userController.readUserById);
users.put(
  "/:id",
  getAllParams,
  addUser,
  validate,
  userController.updateUserById
);
users.delete("/:id", getAllParams, validate, userController.deleteUserById);

module.exports = users;
