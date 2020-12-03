require("dotenv-safe").config();
const express = require('express');

const app = express();

//Add-ons
const morgan = require('morgan');
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');


//Routes
const routes = require('./routes');
const allowedDomains = process.env.ORIGIN_ADDRESS ? process.env.ORIGIN_ADDRESS.split(' ') : ['http://localhost:3000'];

app.use(morgan('dev'));
app.use(cors({
    origin: function (origin, callback) {
        if(!origin) return callback(null, true);
     
        if(allowedDomains.indexOf(origin) === -1) {
          var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
          return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

app.use('/', routes);
app.use('/static', express.static('public'))

const port = process.env.PORT||8080;
app.listen(port);