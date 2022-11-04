require("dotenv").config();
const { Pool } = require("pg");

const db = new Pool({
  /* connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_DATABASE}?schema=public`, */
  connectionString: process.env.DB_URL,
});

module.exports = db;
