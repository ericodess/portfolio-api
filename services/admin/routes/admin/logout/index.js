const express = require('express');

const router = express.Router();

const logout = require('./logout');

router.use('/', logout);

module.exports = router;