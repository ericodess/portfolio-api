const express = require('express');

//Models
const getConnection = require('../../models/createPool');
const getQuery = require('../../models/createQuery');

const router = express.Router();

router.get('/', async (req, res) => {
    const connection = getConnection();

    await getQuery(connection, "SELECT * FROM posts")
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
    .catch(() => {
        res.status(500).json({
            success: false,
            description: 'Server error, please try again'
        });
    })
});

router.get('/:postId', async (req, res) => {
    const connection = getConnection();

    await getQuery(connection, "SELECT * FROM posts WHERE post_id = ?", [
        req.params.postId
    ])
    .then(result => {
        if(result.length === 0){
            res.status(404).json({
                success: false,
                description: 'Post not found'
            });
        }else{
            res.status(200).json({
                success: true,
                posts: result[0]
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

router.get('/author/:postAuthor', async (req, res) => {
    const connection = getConnection();

    await getQuery(connection, "SELECT * FROM posts WHERE post_author = ?", [
        req.params.postAuthor
    ])
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
    .catch(() => {
        res.status(500).json({
            success: false,
            description: 'Server error, please try again'
        });
    })
});

module.exports = router;