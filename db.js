const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "cara4579",
  database: "demonslayer",
  host:"localhost",
  port: 5432

})

module.exports = pool;