const express = require('express');

const router = express.Router();

const namahEndpoint = require('./namah');

router.use('/namah', namahEndpoint);

module.exports = router;