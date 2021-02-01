require("dotenv-safe").config();
const express = require('express');

const app = express();

//Add-ons
const morgan = require('morgan');
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 9005;

//Routes
const routes = require('./routes');

//Cors domains
const allowedDomains = [`http://localhost:${port}`];

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
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(express.static('public'));

app.use('/', routes);

app.listen(port);