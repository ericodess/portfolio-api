const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const accessToken = req.cookies.access_token,
          loggedUser = req.cookies.logged_user,
          loginPageURL = '/admin/login';
    
    if(accessToken && loggedUser){
        res.clearCookie("access_token");
        res.clearCookie("logged_user");
    };

    res.redirect(loginPageURL);

    res.end();
});

module.exports = router;