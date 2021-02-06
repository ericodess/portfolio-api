const express = require('express');

//Models
const getConnection = require('../../../../models/createPool');
const getQuery = require('../../../../models/createQuery');

//Services
const {translateObjectListKeys} = require('../../../../services');

const router = express.Router();

router.get('/', (req, res) => { 
    getConnection(async (error,connection) => {
        if(!error && connection){
            await getQuery(connection, {
                queryRequest: req.query,
                queryTargetTable: 'products'
            })
            .then(result => {
                if(result.length === 0){
                    res.status(404).json({
                        success: false,
                        description: 'No products found'
                    });
                }else{
                    res.status(200).json({
                        success: true,
                        products: translateObjectListKeys(result)
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