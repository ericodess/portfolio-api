const express = require('express');

const router = express.Router();

const dashboard = require('./dashboard');

router.use('/', dashboard);

module.exports = router;