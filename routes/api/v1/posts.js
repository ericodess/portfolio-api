const express = require('express');

//Models
const getConnection = require('../../../models/createPool');
const getQuery = require('../../../models/createQuery');

const router = express.Router();

router.get('/', (req, res) => {
    getConnection(async (error,connection) => {
        await getQuery(connection, {
            queryRequest: req.query,
            queryTargetTable: 'posts'
        })
        .then(result => {
            if(result.length === 0){
                res.status(404).json({
                    success: false,
                    description: 'No posts found'
                });
            }else{
                res.status(200).json({
                    success: true,
                    posts: result
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
    });
});

module.exports = router;