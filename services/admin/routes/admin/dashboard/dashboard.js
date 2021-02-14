const express = require('express');
const jwt = require('jsonwebtoken');

//Models
const getConnection = require('../../../models/createPool');
const getQuery = require('../../../models/createQuery');

const router = express.Router();

router.get('/', (req, res) => {
    const access_token = req.cookies.access_token,
          dashboardURL = '/admin/login';
    
    if(!access_token){
        res.redirect(dashboardURL);

        res.end();
    }else{
        jwt.verify(access_token, process.env.SECRET, (err) => {
            if(err){
                res.redirect(dashboardURL);

                res.end();
            };
        });
    };

    res.status(200).json({
        success: true
    });
});

module.exports = router;