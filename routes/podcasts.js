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

router.get('/', (req, res, next) => {
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

router.get('/:podcastId', (req, res, next) => {
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

router.get('/author/:podcastAuthor', (req, res, next) => {
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