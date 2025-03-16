import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.DB_PORT
});

pool.on("connect", () => {
    console.log(
        "Connection pool established with Database"
    )
});

export default pool;