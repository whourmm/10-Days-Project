const pkg = require('pg');

const { Pool } = pkg;

const pool = new Pool({
    user: String(process.env.POSTGRES_USER),
    host: String(process.env.DB_HOST),
    database: String(process.env.POSTGRES_DB),
    password: String(process.env.POSTGRES_PASSWORD),
    port: Number(process.env.DB_PORT)
});

module.exports = pool;