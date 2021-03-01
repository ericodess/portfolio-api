const express = require('express');

const router = express.Router();

const dashboard = require('./dashboard'),
      infoEndpoint = require('./info');

router.use('/', dashboard);
router.use('/info', infoEndpoint);

module.exports = router;