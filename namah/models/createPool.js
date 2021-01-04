const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

const getConnection = async (cb) => {
    pool.getConnection((error, connection) => {
        if(error) {
          return cb(error);
        }
        cb(null, connection);
    });
};

module.exports = getConnection;