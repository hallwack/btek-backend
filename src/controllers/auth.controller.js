const argon = require("argon2");
const userModel = require("../models/users.model");
const forgotPasswordModel = require("../models/forgotPassword.model");
const jwt = require("jsonwebtoken");
const { insertProfile } = require("../models/profile.model");

const generateCode = () => {
  const digits = "0123456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    code += digits[Math.floor(Math.random() * 10)];
  }

  return code;
};

exports.login = async (req, res) => {
  try {
    const user = await userModel.selectUserByEmail(req.body.email);
    if (user.rowCount) {
      const valid = await argon.verify(
        user.rows[0].password,
        req.body.password
      );

      if (valid) {
        const { id } = user.rows[0];
        const token = jwt.sign(id, process.env.APP_SECRET || "default-key");
        return res.json({
          success: true,
          message: "Login success",
          results: {
            token,
          },
        });
      }
    }

    return res.status(401).json({
      success: false,
      message: "Error: Wrong email or password",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};

exports.register = async (req, res) => {
  try {
    req.body.password = await argon.hash(req.body.password);
    const user = await userModel.insertUser(req.body);

    if (user.rowCount) {
      const createdUser = user.rows[0];
      req.body.userId = createdUser.id;
      const profile = await insertProfile(req.body);

      if (profile.rowCount) {
        return res.json({
          success: true,
          message: "Register Success",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    req.body.code = generateCode();
    const user = await userModel.selectUserByEmail(req.body.email);
    req.body.userId = user.rows[0].id;
    if (user.rowCount) {
      const forgotPassword = await forgotPasswordModel.forget(req.body);

      if (forgotPassword.rowCount) {
        return res.json({
          success: true,
          message: "Create new password succesfully",
          results: forgotPassword.rows[0],
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: `Email not found!`,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const user = await forgotPasswordModel.getForgotPassword(req.body);

    if (user.rowCount) {
      if (user.rows[0].updatedAt) {
        return res.status(400).json({
          success: false,
          message: "Code has been used",
        });
      }

      const updatePassword = await userModel.updateUserById(
        user.rows[0].userId,
        user.rows[0].email,
        await argon.hash(req.body.newPassword)
      );

      if (updatePassword.rowCount) {
        const updatePassword = await forgotPasswordModel.updateForgotPassword(
          user.rows[0].userId,
          user.rows[0].email
        );

        return res.json({
          success: true,
          message: "Reset password successfully!",
          results: updatePassword.rows[0],
        });
      }

      return res.status(500).json({
        success: false,
        message: "Unexpected error on updating data",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `Email or code cannot be identified!`,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};
