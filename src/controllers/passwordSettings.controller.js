const argon = require("argon2");
const forgotPasswordModel = require("../models/forgotPassword.model");

exports.forgotPassword = async (req, res) => {
  try {
    // nerima email
    // create forgotPassword ke tabel password
    // passing code baru
    const { email } = req.body;
    const id = req.userData;
    const password = `forgotPassword-${Date.now().toString()}`;
    const hashPassword = await argon.hash(password);

    const forgotPassword = await forgotPasswordModel.forget(
      hashPassword,
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
