const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

app.get('/',function(req,res){
    res.status(200).send(`Welcome to login`);
});
app.post('/api/login',(req,res) => {
    if(req.body.email === 'erickfcaldeira@gmail.com' && req.body.password === 'noel'){
        res.status(200).json({
            success: true
        });
    }else{
        res.status(404).json({
            success: false,
            description: 'Invalid username or password'
        });
    }
});

const port = process.env.PORT||8080;
app.listen(port);