const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authCredentials = (req, res, next) => {
    const accessToken = req.cookies.access_token,
          loginPageURL = '/admin/login',
          logoutURL = '/admin/logout';

    if(!accessToken){
        res.redirect(loginPageURL);

        res.end();
    }else{
        jwt.verify(accessToken, process.env.SECRET, (err) => {
            if(err){
                res.redirect(logoutURL);

                res.end();
            }else{
                next();
            };
        });
    };
};

router.get('/', authCredentials, (req, res) => {
    res.sendFile('./public/dashboard.html', {root: './'});
});

module.exports = router;