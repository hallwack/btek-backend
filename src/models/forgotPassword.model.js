const db = require("../helpers/db");

const table = "forgotPassword";

exports.forget = (code, email, userId) => {
  const sql = `INSERT INTO "${table}" ("code", "email", "userId") VALUES ($1, $2, $3) RETURNING *`;
  const params = [code, email, userId];
  return db.query(sql, params);
};
