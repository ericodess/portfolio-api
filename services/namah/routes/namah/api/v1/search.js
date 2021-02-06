const express = require('express');

//Models
const getConnection = require('../../../../models/createPool');
const getQuery = require('../../../../models/createQuery');

//Services
const {
    toCamelCase,
    translateObjectListKeys
} = require('../../../../services');

const router = express.Router();

const delay = () => {
    return new Promise(resolve => setTimeout(resolve, 1000))
};

router.get('/', async (req, res) => {
    const avaiableTables = ['courses', 'podcasts', 'posts', 'products', 'users'];
    let searchResult = {}, tableParams;

    if(req.query.q){
        for(const currentTable of avaiableTables) {
            getConnection(async (error,connection) => {
                if(!error && connection){
                    connection.query(`DESCRIBE ${currentTable}`, async (error,result) => {
                        if(!error && result){
                            tableParams = [];
    
                            for (const value of Object.values(result)){
                                const splittedParam = value.Field.split('_');
                                
                                if(splittedParam[splittedParam.length - 1] !== 'password' && splittedParam[splittedParam.length - 1] !== 'email' 
                                    && splittedParam[splittedParam.length - 1] !== 'currency' && splittedParam[splittedParam.length - 1] !== 'price'
                                    && splittedParam[splittedParam.length - 1] !== 'date' ){
    
                                    tableParams.push(value.Field);
                                }
                            }
                        }
                    });
    
                    connection.release();
                }else{
                    res.status(500).json({
                        success: false,
                        description: 'Server error, please try again'
                    });
                } 
            });
    
            await delay();
            
            getConnection(async (error,connection) => {
                if(!error && connection){
                    await getQuery(connection, {
                        queryRequest: {
                            q: req.query.q,
                            limit: req.query.limit
                        },
                        queryTargetItems: tableParams,
                        queryTargetTable: currentTable
                    })
                    .then(result => {
                        searchResult = {...searchResult, [toCamelCase(currentTable)]: translateObjectListKeys(result)};
    
                        if(Object.keys(searchResult).length === avaiableTables.length){
                            res.status(200).json({
                                success: true,
                                searchResult: searchResult
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
                            console.log(error)
                            res.status(500).json({
                                success: false,
                                description: 'Server error, please try again'
                            });
                        } 
                    });
    
                    connection.release();
                } 
            });
        }
    }else{
        res.status(500).json({
            success: false,
            description: 'Invalid or missing search value'
        });
    }
});

module.exports = router;