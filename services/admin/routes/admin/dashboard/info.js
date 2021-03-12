const express = require('express');
const jwt = require('jsonwebtoken');

//Models
const {
    getConnection,
    getQuery
} = require('../../../models');

//Service
const {
    getCpuUsage,
    getMemoryUsage
} = require('../../../services');

const router = express.Router();

const authCredentials = (req, res, next) => {
    const accessToken = req.cookies.access_token;

    if(!accessToken){
        res.status(200).json({
            success: false,
            description: "Missing access_token please login again and try again"
        });

        res.end();
    }else{
        jwt.verify(accessToken, process.env.SECRET, (err) => {
            if(err){
                res.status(200).json({
                    success: false,
                    description: `${err.name === "TokenExpiredError" ? "Expired" : "Invalid"} access_token please login again and try again`
                });

                res.end();
            }else{
                next();
            };
        });
    };
};

router.get('/', authCredentials, async (req, res) => {
    if(req.query.q){
        if(req.query.q === "table-status"){
            getConnection(async (error, connection) => {
                if(!error && connection){
                    getQuery(connection, {
                        queryRequest:{
                            schema: process.env.DATABASE_NAME
                        },
                        queryTargetItems: 'table_name',
                        queryTargetItemsPrefix: 'table',
                        queryTargetTable: 'information_schema.tables',
                        queryIsBinary: false,
                        queryIsLimitless: true
                    })
                    .then(result => {
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
                    })
                    .catch(error => {
                        res.status(500).json({
                            success: false,
                            description: 'Server error, please try again'
                        });
                    })
    
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