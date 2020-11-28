const express = require('express');

//Models
const getConnection = require('../../../models/createPool');
const getQuery = require('../../../models/createQuery');

const router = express.Router();

router.get('/offset/:conceptOffset', (req, res) => {
    getConnection(async (error, connection) => {
        await getQuery(connection, "SELECT * FROM concepts LIMIT ?", [
            parseInt(req.params.conceptOffset)
        ])
        .then(result => {
            if(result.length === 0){
                res.status(404).json({
                    success: false,
                    description: 'No concepts found'
                });
            }else{
                res.status(200).json({
                    success: true,
                    concepts: result
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