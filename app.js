require("dotenv-safe").config();
const express = require('express');

const app = express();

//Add-ons
const morgan = require('morgan');
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

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

app.use(morgan('dev'));
app.use(cors({
    origin: `${process.env.ORIGIN_ADDRESS || 'http://localhost:3000'}`,
    credentials: true
}));
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

const getConnection = () => {
    return pool;
}

//Server routes
app.get('/',function(req,res){
    res.status(200).send(`Welcome to login`);
});

app.post('/api/auth',(req,res) => {
    const connection = getConnection();

    connection.query("SELECT user_name FROM user_table WHERE user_email LIKE BINARY ? AND user_password LIKE BINARY ?", [
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

app.get('/api/users', (req, res, next) => {
    const connection = getConnection();

    connection.query("SELECT user_id,user_name FROM user_table", (error,result) => {
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
                user_info: result
            });
        }
    });
});

app.get('/api/user/:clientName', (req, res, next) => {
    const connection = getConnection();

    connection.query("SELECT * FROM user_table WHERE user_name = ?", [
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
                user_info: {
                    userId: result[0].user_id,
                    userName: result[0].user_name
                }
            });
        }
    });
});

const port = process.env.PORT||8080;
app.listen(port);