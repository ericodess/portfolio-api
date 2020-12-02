const express = require('express');

const router = express.Router();

const rootEndpoint = require('./root');
const namahEndpoint = require('./namah');
const eFrederickEndpoint = require('./eFrederick');

router.use('/', rootEndpoint);
router.use('/eFrederick', eFrederickEndpoint);
router.use('/namah', namahEndpoint);

module.exports = router;