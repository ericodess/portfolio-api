const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const  loginPageURL = '/admin/login';

    res.redirect(loginPageURL);

    res.end();
});

module.exports = router;