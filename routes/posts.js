const express = require('express');

//Models
const getConnection = require('../models/createPool');

const router = express.Router();

router.get('/', (req, res) => {
    const connection = getConnection();

    connection.query("SELECT * FROM posts", (error,result) => {
        if(error){
            res.status(500).json({
                success: false,
                description: 'Server error, please try again'
            });
        }
        if(result.length === 0){
            res.status(401).json({
                success: false,
                description: 'No posts found'
            });
        }else{
            res.status(200).json({
                success: true,
                posts: result
            });
        }
    });
});

router.get('/:postId', (req, res) => {
    const connection = getConnection();

    connection.query("SELECT * FROM posts WHERE post_id = ?", [
        req.params.postId
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
                description: 'Post not found'
            });
        }else{
            res.status(200).json({
                success: true,
                posts: result[0]
            });
        }
    });
});

router.get('/author/:postAuthor', (req, res) => {
    const connection = getConnection();

    connection.query("SELECT * FROM posts WHERE post_author = ?", [
        req.params.postAuthor
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
                description: 'No posts found'
            });
        }else{
            res.status(200).json({
                success: true,
                posts: result
            });
        }
    });
});

module.exports = router;