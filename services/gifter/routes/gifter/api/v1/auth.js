const express = require('express');
const jwt = require('jsonwebtoken');

//Models
const {
    getConnection,
    getQuery
} = require('../../../../models');


const router = express.Router();

router.get('/', (req, res) => {
    res.status(405).json({
        success: false,
        description: 'Invalid method, please use POST'
    });
})

router.post('/', (req, res) => {
    getConnection(async (error,connection) => {
        if(!error && connection){
            await getQuery(connection, {
                queryRequest:{
                    login: req.body.login,
                    password: req.body.senha
                },
                queryTargetItems: 'user_id,user_name',
                queryTargetItemsPrefix: 'user',
                queryTargetTable: 'gift_users',
                queryIsBinary: true,
                queryIsLimitless: true
            })
            .then(result => {
                if(result.length === 0){
                    res.status(401).json({
                        success: false,
                        description: 'Login ou senha inválidos (っ´ω`)ﾉ(╥ω╥)'
                    });
                }else{
                    const userId = result[0].user_id;
                    const userName = result[0].user_name;
        
                    const access_token = jwt.sign({userId, userName}, process.env.SECRET, {
                        expiresIn: 600
                    });

                    res.cookie('access_token', access_token, {
                        httpOnly: true, 
                        secure: true
                    });
                    res.status(200).json({
                        success: true,
                        loggedUser: {
                            id: userId,
                            name: userName
                        }
                    });
                }
            })
            .catch(() => {
                res.status(500).json({
                    success: false,
                    description: 'Erro, por favor tente novamente (ノ_<。)ヾ(´ ▽ ` )'
                });
            })

            connection.release();
        }else{
            res.status(500).json({
                success: false,
                description: 'Erro, por favor tente novamente (ノ_<。)ヾ(´ ▽ ` )'
            });
        }
    });
});

router.post('/logout', (req, res) => {
    res.clearCookie('access_token');
    
    res.status(200).json({
        success: true,
        description: 'Logged out'
    });
});

module.exports = router;