const express = require('express');
const jwt = require('jsonwebtoken');

//Models
const {
    getConnection,
    getQuery
} = require('../../../../models');

const router = express.Router();

const verifyJWT = (req, res, next) => {
    const access_token = req.cookies.access_token;

    if(!access_token){
        return res.status(403).json({
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

router.get('/', (req, res) => {
    res.status(405).json({
        success: false,
        description: 'Invalid method, please use POST'
    });
})

router.post('/', (req, res) => {
    const testValidOriginList = ["https://api.efrederick.dev"];

    getConnection(async (error,connection) => {
        if(!error && connection){
            await getQuery(connection, {
                queryRequest:{
                    email: req.body.email,
                    password: req.body.password
                },
                queryTargetItems: 'user_name',
                queryTargetItemsPrefix: 'user',
                queryTargetTable: 'users',
                queryIsBinary: true,
                queryIsPreciseComparison: true
            })
            .then(result => {
                if(result.length === 0){
                    res.status(401).json({
                        success: false,
                        description: 'Invalid username or password'
                    });
                }else{
                    const userName = result[0].user_name;
        
                    if(!testValidOriginList.find(currentOrigin => currentOrigin === req.headers.origin)){
                        const access_token = jwt.sign({userName}, process.env.SECRET, {
                            expiresIn: 600
                        });
            
                        res.cookie('access_token', access_token, {
                            httpOnly: true, 
                            secure: true
                        });
                    };

                    res.status(200).json({
                        success: true,
                        loggedUser: userName
                    });
                }
            })
            .catch(() => {
                res.status(500).json({
                    success: false,
                    description: 'Server error, please try again'
                });
            })

            connection.release();
        }else{
            res.status(500).json({
                success: false,
                description: 'Server error, please try again'
            });
        }
    });
});

module.exports = router;