const express = require('express');

//Models
const getConnection = require('../../../../models/createPool');
const getQuery = require('../../../../models/createQuery');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(405).json({
        success: false,
        description: 'Invalid method, please use POST'
    });
})

router.post('/', (req, res) => {
    getConnection(async (error,connection) => {
        await getQuery(connection, {
            queryRequest:{
                id: req.body.keyId,
                origin: req.body.keyOrigin
            },
            queryTargetItems: 'api_key_value',
            queryTargetTable: 'api_keys',
            queryIsBinary: true
        })
        .then(result => {
            if(result.length === 0){
                res.status(401).json({
                    success: false,
                    description: 'Invalid key data'
                });
            }else{
                res.status(200).json({
                    success: true,
                    key: result[0]
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