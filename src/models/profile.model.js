const db = require("../helpers/db");

const table = "profile";

exports.insertProfile = (data) => {
  const sql = `INSERT INTO "${table}" ("fullName", "picture", "birthDate", "userId") VALUES ($1, $2, $3, $4) RETURNING *`;
  const params = [data.fullname, data.picture, data.birthDate, data.userId];
  return db.query(sql, params);
};

exports.selectProfileByUserId = (id) => {
  const sql = `SELECT ${table}.*, users.email FROM ${table} JOIN "users" ON ${table}."userId" = users.id WHERE "userId" = $1`;
  const params = [id];
  return db.query(sql, params);
};

exports.updateProfileByUserId = (id, data) => {
  const column = Object.keys(data);
  const values = Object.values(data);

  const conditionalSql = [];

  column.forEach((col, index) => {
    conditionalSql.push(`"${col}"=$${2 + index}`);
  });

  const sql = `UPDATE "${table}" SET ${conditionalSql.join(
    ", "
  )} WHERE "userId" = $1 RETURNING *`;
  const params = [id, ...values];
  return db.query(sql, params);
};
