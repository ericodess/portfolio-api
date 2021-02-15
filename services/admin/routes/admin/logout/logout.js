const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const accessToken = req.cookies.access_token,
          loginPageURL = '/admin/login';
    
    if(accessToken){
        res.clearCookie("access_token");
    };

    res.redirect(loginPageURL);

    res.end();
});

module.exports = router;