// models/db.js
const { createPool } = require('mysql');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'notebook',
    connectionLimit: 10
});

module.exports = pool;
