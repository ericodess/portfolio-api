const express = require('express');

const router = express.Router();

const eFrederickEndpoint = require('./efrederick');

router.use('/eFrederick', eFrederickEndpoint);

module.exports = router;