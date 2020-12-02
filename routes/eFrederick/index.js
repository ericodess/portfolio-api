const express = require('express');

const router = express.Router();

const apiV1 = require('./api/v1');

router.use('/api/v1', apiV1);

module.exports = router;