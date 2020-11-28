const express = require('express');

//Service
const generateQuery = require('../../../services/generateQuery');

//Models
const getConnection = require('../../../models/createPool');
const getQuery = require('../../../models/createQuery');

const router = express.Router();

router.get('/', (req, res) => {
    const query = generateQuery({
        requestQueries: req.query,
        targetTable: 'posts'
    });

    getConnection(async (error,connection) => {
        await getQuery(connection, query.queryClauses, query.queryParameters)
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