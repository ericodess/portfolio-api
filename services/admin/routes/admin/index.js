const express = require('express');

const router = express.Router();

const loginEndpoint = require('./login');
const dashboardEndpoint = require('./dashboard');

router.use('/login', loginEndpoint);
router.use('/dashboard', dashboardEndpoint);

module.exports = router;