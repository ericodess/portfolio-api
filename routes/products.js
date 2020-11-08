const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});
const getConnection = () => {
    return pool;
};

router.get('/', (req, res) => {
    const connection = getConnection();

    connection.query("SELECT * FROM product_table", (error,result) => {
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

    connection.query("SELECT * FROM product_table WHERE product_id = ?", [
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