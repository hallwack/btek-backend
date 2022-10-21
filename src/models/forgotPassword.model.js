const db = require("../helpers/db");

const table = "forgotPassword";

exports.forget = (code, email, userId) => {
  const sql = `INSERT INTO "${table}" ("code", "email", "userId") VALUES ($1, $2, $3) RETURNING *`;
  const params = [code, email, userId];
  return db.query(sql, params);
};

exports.resetPassword = (email, password) => {
  const sql = "UPDATE \"users\" SET password = $2 WHERE email = $1 RETURNING *";
  const params = [email, password];
  return db.query(sql, params);
};

exports.getForgotPassword = (code) => {
  const sql = `SELECT * FROM "${table}" WHERE "code" = $1`;
  const params = [code];
  return db.query(sql, params);
};

exports.updateForgotPassword = (id, email) => {
  const sql = `UPDATE "${table}" SET email = $2 WHERE "userId" = $1 RETURNING *`;
  const params = [id, email];
  return db.query(sql, params);
};
