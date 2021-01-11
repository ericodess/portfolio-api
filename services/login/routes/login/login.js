const express = require('express');

//Models
const getConnection = require('../../models/createPool');
const getQuery = require('../../models/createQuery');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('./public/index.html', {root: './'});
});

module.exports = router;