const { Pool } = require("pg");

const db = new Pool({
  connectionString: 'postgresql://btek:btek@localhost:5432/btek-course?schema=public'
});

module.exports = db
