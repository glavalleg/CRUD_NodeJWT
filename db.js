const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: '', //colocar senha do user
  database: 'demonslayer',
  host: 'localhost',
  port: 5432,
});

module.exports = pool;
