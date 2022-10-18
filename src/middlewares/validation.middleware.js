const {
  body,
  query,
  validationResult,
  param,
  matchedData,
} = require("express-validator");

const userValidator = [
  body("email")
    .normalizeEmail()
    .isEmail()
    .notEmpty()
    .withMessage("Provide valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters or more")
    .notEmpty()
    .withMessage("Password is missing"),
];

const paramsUUID = [param("id").isUUID(4).withMessage("Invalid Id")];

const paging = [
  (req, res, next) => {
    req.query.page = req.query.page || "1";
    req.query.limit = req.query.limit || "5";
    req.query.sortBy = req.query.sortBy || "createdAt";
    req.query.searchBy = req.query.searchBy || "email";
    req.query.search = req.query.search || "";
    req.query.reverse = req.query.reverse || "0";
    return next();
  },
  query("page").optional().toInt(10),
  query("limit").optional().toInt(10),
  query("reverse").optional().toBoolean(),
  query("searchBy").optional().isIn(["email"]).withMessage("Data not found"),
  query("search").optional().trim(),
  query("sortBy")
    .optional()
    .isIn(["email", "createdAt", "updatedAt"])
    .withMessage("Data not found"),
];

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);
    /* console.log(matchedData(req, { includeOptionals: true })); */
    if (errors.isEmpty()) return next();
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      results: errors.array(),
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Validation Cannot Work Correctly",
      results: err.message,
    });
  }
};

module.exports = {
  userValidator,
  paramsUUID,
  paging,
  validate,
};
