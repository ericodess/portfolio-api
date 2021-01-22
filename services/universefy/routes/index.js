const express = require('express');

const router = express.Router();

const universefy = require('./universefy');

router.use('/universefy', universefy);

module.exports = router;