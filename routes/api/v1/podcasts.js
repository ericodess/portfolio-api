const express = require('express');

//Models
const getConnection = require('../../../models/createPool');
const getQuery = require('../../../models/createQuery');

const router = express.Router();

router.get('/', (req, res) => {
    getConnection(async (error,connection) => {
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

        connection.release();
    });  
});

router.get('/:podcastId', (req, res) => {
    getConnection(async (error,connection) => {
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

        connection.release();
    });
});

router.get('/offset/:podcastsOffset', (req, res) => {
    getConnection(async (error,connection) => {
        await getQuery(connection, "SELECT * FROM podcasts LIMIT ?", [
            parseInt(req.params.podcastsOffset)
        ])
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
        .catch(error => {
            res.status(500).json({
                success: false,
                description: 'Server error, please try again'
            });
        })

        connection.release();
    });
});

router.get('/author/:podcastAuthor', (req, res) => {
    getConnection(async (error,connection) => {
        await getQuery(connection, "SELECT * FROM podcasts WHERE podcast_author = ?", [req.params.podcastAuthor])
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

        connection.release();
    });
});

module.exports = router;