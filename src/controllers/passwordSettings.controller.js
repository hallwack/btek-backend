const argon = require("argon2");
const forgotPasswordModel = require("../models/forgotPassword.model");
const userModel = require("../models/users.model");

const generateCode = () => {
  const digits = "0123456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    code += digits[Math.floor(Math.random() * 10)];
  }

  return code;
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const getUserByEmail = await userModel.selectUserByEmail(email);
    const id = getUserByEmail.rows[0].id;

    const forgotPassword = await forgotPasswordModel.forget(
      generateCode(),
      email,
      id
    );

    const newPassword = forgotPassword.rows[0];
    return res.json({
      success: true,
      message: "Create new password succesfully",
      results: newPassword,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { code, email, newPassword, confirmPassword } = req.body;
    const getPassword = await forgotPasswordModel.getForgotPassword(code);

    if (newPassword != confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password not match with Confirm Password",
      });
    }

    if (getPassword.rows[0].updatedAt) {
      return res.status(400).json({
        success: false,
        message: "Code has been used",
      });
    }
    
    if (email != getPassword.rows[0].email) {
      return res.status(400).json({
        success: false,
        message: "Email not match with Records Data",
      });
    }

    await forgotPasswordModel.updateForgotPassword(
      getPassword.rows[0].userId,
      email
    );

    const updateUser = await userModel.updatePassword(
      getPassword.rows[0].userId,
      await argon.hash(newPassword)
    );

    return res.json({
      success: true,
      message: "User Password has been changed",
      results: updateUser.rows[0],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};
