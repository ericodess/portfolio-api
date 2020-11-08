const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});
const getConnection = () => {
    return pool;
};

router.get('/', (req, res, next) => {
    const connection = getConnection();

    connection.query("SELECT user_id,user_name FROM users", (error,result) => {
        if(error){
            res.status(500).json({
                success: false,
                description: 'Server error, please try again'
            });
        }
        if(result.length === 0){
            res.status(401).json({
                success: false,
                description: 'No users found'
            });
        }else{
            res.status(200).json({
                success: true,
                users: result
            });
        }
    });
});

router.get('/:clientName', (req, res, next) => {
    const connection = getConnection();

    connection.query("SELECT user_id,user_name FROM users WHERE user_name = ?", [
        req.params.clientName
    ], (error,result) => {
        if(error){
            res.status(500).json({
                success: false,
                description: 'Server error, please try again'
            });
        }
        if(result.length === 0){
            res.status(401).json({
                success: false,
                description: 'User not found'
            });
        }else{
            res.status(200).json({
                success: true,
                users: result[0]
            });
        }
    });
});

module.exports = router;