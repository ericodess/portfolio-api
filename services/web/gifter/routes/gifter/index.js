const express = require('express');

const router = express.Router();

const apiEndpoint = require('./api');

router.use('/api', apiEndpoint);

module.exports = router;