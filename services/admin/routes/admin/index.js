const express = require('express');

const router = express.Router();

const loginEndpoint = require('./login'),
      logoutEndpoint = require('./logout'),
      dashboardEndpoint = require('./dashboard');

router.get('/', (req, res) => {
    const  loginPageURL = '/admin/login';

    res.redirect(loginPageURL);

    res.end();
});

router.use('/login', loginEndpoint);
router.use('/logout', logoutEndpoint );
router.use('/dashboard', dashboardEndpoint);

module.exports = router;