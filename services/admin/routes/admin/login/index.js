const express = require('express');

const router = express.Router();

const login = require('./login');
const auth = require('./auth');

router.use('/', login);
router.use('/auth', auth);

module.exports = router;