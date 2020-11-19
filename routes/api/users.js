const express = require('express');

//Models
const getConnection = require('../../models/createPool');
const getQuery = require('../../models/createQuery');

const router = express.Router();

router.get('/', (req, res) => {
    getConnection(async (error,connection) => {
        await getQuery(connection, "SELECT user_id,user_name FROM users")
        .then(result => {
            if(result.length === 0){
                res.status(404).json({
                    success: false,
                    description: 'No users found'
                });
            }else{
                res.status(200).json({
                    success: true,
                    users: result
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
    });
});

router.get('/:clientName', (req, res) => {
    getConnection(async (error,connection) => {
        await getQuery(connection, "SELECT user_id,user_name FROM users WHERE user_name = ?", [
            req.params.clientName
        ])
        .then(result => {
            if(result.length === 0){
                res.status(404).json({
                    success: false,
                    description: 'User not found'
                });
            }else{
                res.status(200).json({
                    success: true,
                    users: result[0]
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
    });
});

module.exports = router;