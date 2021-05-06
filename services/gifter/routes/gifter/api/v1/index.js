const express = require('express');

const router = express.Router();

const auth = require('./auth');
const gifts = require('./gifts');

router.use('/auth', auth);
router.use('/gifts', gifts);

module.exports = router;