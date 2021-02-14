const express = require('express');

const router = express.Router();

const adminEndpoint = require('./admin');

router.use('/admin', adminEndpoint);

module.exports = router;