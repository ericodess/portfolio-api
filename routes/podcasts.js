const express = require('express');

//Models
const getConnection = require('../models/createPool');
const getQuery = require('../models/createQuery');

const router = express.Router();

router.get('/', async (req, res) => {
    const connection = getConnection();

    await getQuery(connection, "SELECT * FROM podcasts")
    .then(result => {
        if(result.length === 0){
            res.status(404).json({
                success: false,
                description: 'No podcasts found'
            });
        }else{
            res.status(200).json({
                success: true,
                podcasts: result
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

router.get('/:podcastId', async (req, res) => {
    const connection = getConnection();

    await getQuery(connection, "SELECT * FROM podcasts WHERE podcast_id = ?", [
        req.params.podcastId
    ])
    .then(result => {
        if(result.length === 0){
            res.status(404).json({
                success: false,
                description: 'Podcast not found'
            });
        }else{
            res.status(200).json({
                success: true,
                podcasts: result[0]
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

router.get('/author/:podcastAuthor', async (req, res) => {
    const connection = getConnection();

    await getQuery("SELECT * FROM podcasts WHERE podcast_author = ?", [req.params.podcastAuthor])
    .then(result => {
        if(result.length === 0){
            res.status(404).json({
                success: false,
                description: 'No podcasts found'
            });
        }else{
            res.status(200).json({
                success: true,
                podcasts: result
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