const userModel = require("../models/users.model");

exports.createUser = async (req, res) => {
  const insert = await userModel.insertUser(req.body);
  const user = insert.rows[0];
  let { username } = req.body;
  return res.json({
    success: true,
    message: "Create user successfully " + username,
  });
};

exports.readAllUsers = (req, res) => {
  console.log(req.query);
  return res.json({
    success: true,
    message: "Response read all users",
  });
};

exports.readUserById = (req, res) => {
  return res.json({
    success: true,
    message: "Hello " + req.params.id,
  });
};
