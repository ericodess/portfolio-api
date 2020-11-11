const express = require('express');

//Models
<<<<<<< HEAD:routes/users.js
const getConnection = require('../models/createPool');
const getQuery = require('../models/createQuery');
=======
const getConnection = require('../../models/createPool');
>>>>>>> development:routes/api/users.js

const router = express.Router();

router.get('/', async (req, res) => {
    const connection = getConnection();

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
});

router.get('/:clientName', async (req, res) => {
    const connection = getConnection();

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
});

module.exports = router;