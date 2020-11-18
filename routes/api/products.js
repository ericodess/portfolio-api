const express = require('express');
const querystring = require('querystring');

//Models
const getConnection = require('../../models/createPool');
const getQuery = require('../../models/createQuery');

const router = express.Router();

router.get('/', (req, res) => {
    getConnection(async (error,connection) => {
        await getQuery(connection, "SELECT * FROM products")
        .then(result => {
            if(result.length === 0){
                res.status(404).json({
                    success: false,
                    description: 'No products found'
                });
            }else{
                res.status(200).json({
                    success: true,
                    products: result
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                description: 'Server error, please try again'
            });
        })

        connection.release();
    });
});

router.get('/offset/:productOffset', (req, res) => {
    getConnection(async (error,connection) => {
        await getQuery(connection, "SELECT * FROM products LIMIT ?", [
            parseInt(req.params.productOffset)
        ])
        .then(result => {
            if(result.length === 0){
                res.status(404).json({
                    success: false,
                    description: 'No products found'
                });
            }else{
                res.status(200).json({
                    success: true,
                    products: result
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                description: 'Server error, please try again'
            });
        })

        connection.release();
    });
});

router.get('/:productId', (req, res) => {
    getConnection(async (error,connection) => {
        await getQuery(connection, "SELECT * FROM products WHERE product_id = ?", [
            req.params.productId
        ])
        .then(result => {
            if(result.length === 0){
                res.status(404).json({
                    success: false,
                    description: 'Product not found'
                });
            }else{
                res.status(200).json({
                    success: true,
                    products: result[0]
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