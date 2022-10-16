const { check, validationResult } = require("express-validator");

const userValidation = () => {
  return [
    check("email").isEmail().withMessage("Provide valid email"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 character"),
  ];
};

const validate = (res, req, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) return next();

  const extractedErrors = [];
  error.array().map((err) =>
    extractedErrors.push({
      [err.param]: err.msg,
    })
  );

  return res.status(422).json({
    error: extractedErrors,
  });
};

module.exports = {
  userValidation,
  validate,
};
