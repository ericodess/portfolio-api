const express = require('express');

const router = express.Router();

const universify = require('./universify');

router.use('/universify', universify);

module.exports = router;