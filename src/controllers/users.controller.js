const userModel = require("../models/users.model");

exports.createUser = async (req, res) => {
  try {
    const insert = await userModel.insertUser(req.body);
    const user = insert.rows[0];
    return res.json({
      success: true,
      message: "Create user successfully",
      results: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};

exports.readAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAllUsers();
    return res.json({
      success: true,
      message: "Read all users successfully",
      results: users.rows,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};

exports.readUserById = async (req, res) => {
  try {
    const user = await userModel.findUserById(req.params);
    return res.json({
      success: true,
      message: "Read user by Id successfully",
      results: user.rows[0],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const user = await userModel.updateUserById(id, email, password);
    return res.json({
      success: true,
      message: "Updated user by Id successfully",
      results: user.rows,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const user = await userModel.deleteUserById(req.params);
    return res.json({
      success: true,
      message: "Delete user by Id successfully",
      results: user.rows[0],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};
