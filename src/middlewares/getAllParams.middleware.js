const { param } = require("express-validator");

exports.getAllParams = [param("id").isUUID(4).withMessage("Invalid Id")];
