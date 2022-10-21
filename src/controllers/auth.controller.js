const argon = require("argon2");
const userModel = require("../models/users.model");
const jwt = require("jsonwebtoken");
const { insertProfile } = require("../models/profile.model");

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
