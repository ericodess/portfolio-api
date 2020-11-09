const express = require('express');

//Models
const getConnection = require('../models/createPool');

const router = express.Router();

router.get('/', (req, res) => {
    const connection = getConnection();

    connection.query("SELECT * FROM products", (error,result) => {
        if(error){
            res.status(500).json({
                success: false,
                description: 'Server error, please try again'
            });
        }
        if(result.length === 0){
            res.status(401).json({
                success: false,
                description: 'No products found'
            });
        }else{
            res.status(200).json({
                success: true,
                products: result
            });
        }
    });
});

router.get('/:productId', (req, res) => {
    const connection = getConnection();

    connection.query("SELECT * FROM products WHERE product_id = ?", [
        req.params.productId
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
                description: 'Product not found'
            });
        }else{
            res.status(200).json({
                success: true,
                products: result[0]
            });
        }
    });
});

module.exports = router;