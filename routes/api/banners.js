const express = require('express');

//Models
const getConnection = require('../../models/createPool');
const getQuery = require('../../models/createQuery');

const router = express.Router();

router.get('/', (req, res) => {
    getConnection(async (error,connection) => {
        await getQuery(connection, "SELECT banner_id,banner_title,banner_description FROM banners")
        .then(result => {
            if(result.length === 0){
                res.status(404).json({
                    success: false,
                    description: 'No banners found'
                });
            }else{
                res.status(200).json({
                    success: true,
                    banners: result
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

router.get('/:bannerId', (req, res) => {
    getConnection(async (error,connection) => {
        await getQuery(connection, "SELECT banner_id,banner_title,banner_description FROM banners WHERE banner_id = ?", [
            req.params.bannerId
        ])
        .then(result => {
            if(result.length === 0){
                res.status(404).json({
                    success: false,
                    description: 'Banner not found'
                });
            }else{
                res.status(200).json({
                    success: true,
                    banners: result[0]
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