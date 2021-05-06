const express = require('express');

//Models
const {
    getConnection,
    getQuery
} = require('../../../../models');

//Services
const {
    toCamelCase,
    translateObjectListKeys,
    orderObjectByKey
} = require('../../../../services');

const router = express.Router();

router.get('/', async (req, res) => {
    const avaiableTables = ['courses', 'podcasts', 'posts', 'products', 'users'];
    let searchResult = {};

    if(req.query.q){
        for(const currentTable of avaiableTables) {
            new Promise((resolve, reject) => {
                try{
                    getConnection((error, connection) => {     
                        if(!error && connection){
                            connection.query(`DESCRIBE ${currentTable}`,(error, result) => {
                                if(!error && result){
                                    resolve(() => {
                                        const tableParams = [];
                                        
                                        for(const value of Object.values(result)){
                                            const splittedParam = value.Field.split('_'),
                                                  excludeParamsList = ['password', 'email', 'currency', 'price', 'date'];
                                            
                                            if(!excludeParamsList.find(element => element === splittedParam[splittedParam.length - 1])){
                                                tableParams.push(value.Field);
                                            };
                                        };
        
                                        return(tableParams);
                                    })
                                };
                            });
                
                            connection.release();
                        };
                    })
                }catch(error){
                    reject(error);
                };
            })
            .then(callback => callback())
            .then(tableParams => {
                getConnection(async (error,connection) => {
                    if(!error && connection){
                        const tablePreFix = tableParams[0].split('_')[0];

                        await getQuery(connection, {
                            queryRequest: {
                                q: req.query.q,
                                limit: req.query.limit
                            },
                            queryTargetItems: tableParams,
                            queryTargetItemsPrefix: tablePreFix,
                            queryTargetTable: currentTable,
                            queryIsLimitless: true
                        })
                        .then(result => {
                            searchResult = {...searchResult, [toCamelCase(currentTable)]: translateObjectListKeys(result)};
        
                            if(Object.keys(searchResult).length === avaiableTables.length){
                                res.status(200).json({
                                    success: true,
                                    searchResult: orderObjectByKey(searchResult)
                                });
                            }
                        })
                        .catch((error) => {
                            if(error.code === 'ER_BAD_FIELD_ERROR'){
                                res.status(500).json({
                                    success: false,
                                    description: 'Invalid query parameter'
                                });
                            }else{
                                res.status(500).json({
                                    success: false,
                                    description: 'Server error, please try again'
                                });
                            } 
                        });
        
                        connection.release();
                    } 
                });
            })
            .catch(() => {
                res.status(500).json({
                    success: false,
                    description: 'Server error, please try again'
                });
            })
        }
    }else{
        res.status(200).json({
            success: false,
            description: 'Invalid or missing search value'
        });
    }
});

module.exports = router;