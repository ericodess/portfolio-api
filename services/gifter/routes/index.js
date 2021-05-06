const express = require('express');

const router = express.Router();

const gifterEndpoint = require('./gifter');

router.use('/gifter', gifterEndpoint);

module.exports = router;