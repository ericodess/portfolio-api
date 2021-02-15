const express = require('express');

const router = express.Router();

const loginEndpoint = require('./login');
const logoutEndpoint = require('./logout');
const dashboardEndpoint = require('./dashboard');

router.use('/login', loginEndpoint);
router.use('/logout', logoutEndpoint );
router.use('/dashboard', dashboardEndpoint);

module.exports = router;