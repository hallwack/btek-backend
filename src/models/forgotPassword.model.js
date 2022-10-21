const db = require("../helpers/db");

const table = "forgotPassword";

exports.forget = (data) => {
  const sql = `INSERT INTO "${table}" ("code", "email", "userId") VALUES ($1, $2, $3) RETURNING *`;
  const params = [data.code, data.email, data.userId];
  return db.query(sql, params);
};

exports.getForgotPassword = (data) => {
  const sql = `SELECT * FROM "${table}" WHERE "code" = $1 AND email = $2`;
  const params = [data.code, data.email];
  return db.query(sql, params);
};

exports.updateForgotPassword = (id, email) => {
  const sql = `UPDATE "${table}" SET email = $2 WHERE "userId" = $1 RETURNING *`;
  const params = [id, email];
  return db.query(sql, params);
};
