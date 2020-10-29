require("dotenv-safe").config();

const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken'); 
const cors = require('cors');

const app = express();
const verifyJWT = (req, res, next) => {
    const access_token = req.headers['access-token'];

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
app.use(cors());
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

app.get('/',function(req,res){
    res.status(200).send(`Welcome to login`);
});

app.post('/api/login',(req,res) => {
    if(req.body.email === 'efrederick.dev@gmail.com' && req.body.password === 'pepeyen'){
        /**
         * This will be handled by the database
         * For now i will use mock up data
         */
        const user_id = 42069;

        const access_token = jwt.sign({user_id}, process.env.SECRET, {
            expiresIn: 600 //10 minutes
        });
        res.status(200).json({
            success: true,
            access_token: access_token
        });
    }else{
        res.status(401).json({
            success: false,
            description: 'Invalid username or password'
        });
    }
});

app.get('/api/client/:client_id', verifyJWT, (req, res, next) => {
    /**
     * This will be handled by the database
     * For now i will use mock up data
     */
    switch (req.params.client_id) {
        case '24':
            return res.status(200).json({
                success: true,
                user_info: {
                    user_id: 24,
                    user_name:'Lusquete'
                }
            });
        case '42069':
            return res.status(200).json({
                success: true,
                user_info: {
                    user_id: 42069,
                    user_name: 'Pepeyen'
                }
            });
        default:
            return res.status(404).json({
                success: false,
                description: 'User not found'
            });
    }
});

const port = process.env.PORT||8080;
app.listen(port);