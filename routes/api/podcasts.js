const express = require('express');

//Models
const getConnection = require('../../models/createPool');

const router = express.Router();

router.get('/', (req, res) => {
    const connection = getConnection();

    connection.query("SELECT * FROM podcasts", (error,result) => {
        if(error){
            res.status(500).json({
                success: false,
                description: 'Server error, please try again'
            });
        }
        if(result.length === 0){
            res.status(401).json({
                success: false,
                description: 'No podcasts found'
            });
        }else{
            res.status(200).json({
                success: true,
                podcasts: result
            });
        }
    });
});

router.get('/:podcastId', (req, res) => {
    const connection = getConnection();

    connection.query("SELECT * FROM podcasts WHERE podcast_id = ?", [
        req.params.podcastId
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
                description: 'Podcast not found'
            });
        }else{
            res.status(200).json({
                success: true,
                podcasts: result[0]
            });
        }
    });
});

router.get('/author/:podcastAuthor', (req, res) => {
    const connection = getConnection();

    connection.query("SELECT * FROM podcasts WHERE podcast_author = ?", [
        req.params.podcastAuthor
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
                description: 'No podcasts found'
            });
        }else{
            res.status(200).json({
                success: true,
                podcasts: result
            });
        }
    });
});

module.exports = router;