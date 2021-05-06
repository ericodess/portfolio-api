const express = require('express');

const router = express.Router();

const dashboardEndpoint = require('./dashboard'),
      loginEndpoint = require('./login'),
      logoutEndpoint = require('./logout'),
      rootEndpoint = require('./root');

router.use('/', rootEndpoint);

router.use('/dashboard', dashboardEndpoint);
router.use('/login', loginEndpoint);
router.use('/logout', logoutEndpoint);

module.exports = router;