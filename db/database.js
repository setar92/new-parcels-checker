const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const caCert = fs.readFileSync(path.resolve(__dirname, 'ca.pem')).toString();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: true,
        // Вказуємо сертифікат прямо в коді
        ca: caCert,
}};

const pool = new Pool(config);

pool.connect((err) => {
    if (err) throw err;
    console.log("Connected to PostgreSQL successfully!");
});

module.exports = pool;
