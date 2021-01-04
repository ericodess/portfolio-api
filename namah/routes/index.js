const express = require('express');

const router = express.Router();

const namahEndpoint = require('./namah');

router.use('/namah/api', namahEndpoint);

module.exports = router;