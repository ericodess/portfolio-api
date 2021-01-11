const express = require('express');

const router = express.Router();

const loginEndpoint = require('./login');

router.use('/login', loginEndpoint);

module.exports = router;