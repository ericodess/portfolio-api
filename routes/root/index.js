const express = require('express');

const router = express.Router();

const options = {
    root: __dirname + '/../../public/',
    dotfiles: 'deny'
};

router.get('/', (req,res) => {
    res.status(200).sendFile("index.html", options, (error) => {
        if(error) {
            res.status(404).json({
                success: false,
                description: 'File not found'
            });
        };
    });
});

router.get('/:pageName', (req,res) => {
    res.status(200).sendFile(`${req.params.pageName}.html`, options, (error) => {
        if(error) {
            res.status(404).json({
                success: false,
                description: 'File not found'
            });
        };
    });
});

module.exports = router;