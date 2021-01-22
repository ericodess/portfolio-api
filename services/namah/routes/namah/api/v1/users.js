const express = require('express');

//Models
const getConnection = require('../../../../models/createPool');
const getQuery = require('../../../../models/createQuery');

const router = express.Router();

router.get('/', (req, res) => {
    getConnection(async (error,connection) => {
        if(!error && connection){
            await getQuery(connection, {
                queryRequest: {
                    name: req.query.name,
                    id: req.query.id
                },
                queryTargetItems: 'user_id,user_name',
                queryTargetTable: 'users'
            })
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
            .catch((error) => {
                if(error.code === 'ER_BAD_FIELD_ERROR'){
                    res.status(500).json({
                        success: false,
                        description: 'Invalid query parameter'
                    });
                }else{
                    res.status(500).json({
                        success: false,
                        description: 'Server error, please try again'
                    });
                } 
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