const express = require('express');

//Models
const getConnection = require('../../models/createPool');

const router = express.Router();

router.get('/', (req, res) => {
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

router.get('/:clientName', (req, res) => {
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