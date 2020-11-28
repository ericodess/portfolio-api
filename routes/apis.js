const express = require('express');

const router = express.Router();

const apiV1 = require('./api/v1');
const apiBeta = require('./api/beta');

router.use('/v1', apiV1)
router.use('/beta', apiBeta);

module.exports = router;