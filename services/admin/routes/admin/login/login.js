const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => {
    const access_token = req.cookies.access_token;
          dashboardPageURL = '/admin/dashboard';

    if(access_token){
        jwt.verify(access_token, process.env.SECRET, (err) => {
            if(!err){
                res.redirect(dashboardPageURL);

                res.end();
            };
        });
    }else{
        res.sendFile('./public/login.html', {root: './'});
    };  
});

module.exports = router;