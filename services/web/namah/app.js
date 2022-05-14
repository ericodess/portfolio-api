require("dotenv-safe").config();
const express = require('express');

const app = express();

//Add-ons
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 9002;

//Routes
const routes = require('./routes');

//Cors domains
const allowedDomains = process.env.ORIGIN_ADDRESS ? process.env.ORIGIN_ADDRESS.split(' ') : ['http://localhost:3000', `http://localhost:8000`];

app.use(morgan('dev'));
app.use(cors({
		origin: function (origin, callback) {
			if(!origin) return callback(null, true);

			if(allowedDomains.indexOf(origin) === -1) {
				const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
		credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use('/', routes);

app.listen(port);