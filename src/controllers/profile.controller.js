const profileModel = require("../models/profile.model");

exports.readProfileById = async (req, res) => {
  try {
    const userId = req.params.id || req.userData;
    const profile = await profileModel.selectProfileByUserId(userId);
    if (profile.rowCount) {
      return res.json({
        success: true,
        message: `Profile user with id ${userId}`,
        results: profile.rows[0],
      });
    }
    return res.status(400).json({
      success: false,
      message: `User with id ${userId} not found!`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await profileModel.updateProfileByUserId(
      req.userData,
      req.body
    );

    if (profile.rowCount) {
      return res.json({
        success: true,
        message: "Update profile success",
        results: profile.rows[0],
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};
