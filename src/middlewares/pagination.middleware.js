const { query } = require("express-validator");

exports.pagination = [
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
