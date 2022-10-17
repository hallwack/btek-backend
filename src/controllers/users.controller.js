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
  req.query.offset = (req.query.page - 1) * req.query.limit;
  try {
    const users = await userModel.findAllUsers(req.query);
    const { rowCount } = await userModel.selectAll(req.query);
    const pageInfo = {
      page: req.query.page,
      limit: req.query.limit,
    };
    pageInfo.totalPage = Math.ceil(rowCount / req.query.limit);
    pageInfo.nextPage =
      req.query.page < pageInfo.totalPage ? req.query.page + 1 : null;
    pageInfo.previousPage = req.query.page > 1 ? req.query.page - 1 : null;
    pageInfo.totalData = rowCount;
    return res.json({
      success: true,
      message: "Read all users successfully",
      pageInfo,
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
