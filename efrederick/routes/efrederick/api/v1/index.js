const express = require('express');

const router = express.Router();

const keys = require('./keys');

router.use('/keys', keys);

module.exports = router;