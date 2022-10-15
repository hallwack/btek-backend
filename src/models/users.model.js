const db = require("../helpers/db");

const table = "users";

exports.insertUser = (data) => {
  const sql = `INSERT INTO ${table} ("email", "password") VALUES ($1, $2) RETURNING *`;
  const params = [data.email, data.password];
  return db.query(sql, params);
};

exports.findAllUsers = () => {
  const sql = `SELECT * FROM ${table}`;
  return db.query(sql);
};

exports.findUserById = (data) => {
  const sql = `SELECT * FROM ${table} WHERE "id" = $1`;
  const params = [data.id];
  return db.query(sql, params);
};
