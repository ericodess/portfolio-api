const express = require('express');
const jwt = require('jsonwebtoken');
const os = require('os');

//Models
const getConnection = require('../../../models/createPool');
const getQuery = require('../../../models/createQuery');

//Service
const {
    getCpuUsage,
    getMemoryUsage
} = require('../../../services');

const router = express.Router();

const authCredentials = (req, res, next) => {
    const accessToken = req.cookies.access_token,
          loginPageURL = '/admin/login',
          logoutURL = '/admin/logout';

    if(!accessToken){
        if(req._parsedUrl.pathname !== "/" && req.query.q){
            res.status(200).json({
                success: false,
                description: "Missing access_token please login again and try again"
            });
        }else{
            res.redirect(loginPageURL);
        };

        res.end();
    }else{
        jwt.verify(accessToken, process.env.SECRET, (err) => {
            if(err){
                if(req._parsedUrl.pathname !== "/" && req.query.q){
                    res.status(200).json({
                        success: false,
                        description: `${err.name === "TokenExpiredError" ? "Expired" : "Invalid"} access_token please login again and try again`
                    });
                }else{
                    res.redirect(logoutURL);
                };

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

router.get('/info', authCredentials, async (req, res) => {
    if(req.query.q){
        if(req.query.q === "table-status"){
            getConnection(async (error, connection) => {
                if(!error && connection){
                    connection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = ?", [process.env.DATABASE_NAME], async (error, result) => {
                        if(!error && result){
                            const tableList = [];
                            
                            result.forEach(currentTable => {
                                tableList.push(currentTable.table_name);
                            });
                            
                            res.status(200).json({
                                success: true,
                                databaseStatus: {
                                    tableList: tableList
                                } 
                            });
                        }else{
                            res.status(500).json({
                                success: false,
                                description: 'Server error, please try again'
                            });
                        };
                    });
    
                    connection.release();
                }else{
                    res.status(500).json({
                        success: false,
                        description: 'Server error, please try again'
                    });
                };
            });
        }else{
            if(req.query.q === "system-status"){         
                res.status(200).json({
                    success: true,
                    systemStatus: {
                        cpu: {
                            usedPercentage: await getCpuUsage()
                        },
                        memory: getMemoryUsage()
                    }
                });
            }else{
                res.status(200).json({
                    success: false,
                    description: "Invalid query value"
                });
            };
        };
    }else{
        if(Object.entries(req.query).length > 0){
            res.status(200).json({
                success: false,
                description: "Invalid query parameter"
            });
        }
    };
});

module.exports = router;