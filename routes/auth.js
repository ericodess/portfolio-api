const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

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
const verifyJWT = (req, res, next) => {
    const access_token = req.cookies.access_token;

    if(!access_token){
        return res.status(401).json({
            success: false,
            description: 'No access_token provided'
        });
    }

    jwt.verify(access_token, process.env.SECRET, (err,decoded) => {
        if(err){
            return res.status(500).json({
                success: false,
                description: 'Failed to authenticate access_token'
            });
        }
        req.user_id = decoded.user_id;
        next();
    });
};

router.post('/',(req,res) => {
    const connection = getConnection();

    connection.query("SELECT user_name FROM users WHERE user_email LIKE BINARY ? AND user_password LIKE BINARY ?", [
        req.body.email,
        req.body.password
    ],(error,result) => {
        if(error){
            res.status(500).json({
                success: false,
                description: 'Server error, please try again'
            });
        }

        if(result.length === 0){
            res.status(401).json({
                success: false,
                description: 'Invalid username or password'
            });
        }else{
            const userName = result[0].user_name;

            const access_token = jwt.sign({userName}, process.env.SECRET, {
                expiresIn: 600
            });

            res.cookie('access_token', access_token, {
                httpOnly: true, 
                secure: true
            });
            res.status(200).json({
                success: true,
                loggedUser: userName
            });
        }
    });
});

module.exports = router;