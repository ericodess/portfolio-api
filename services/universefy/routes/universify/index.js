require('dotenv').config();

const express = require('express');
const querystring = require('querystring');
const request = require('request');

//Serivces
const generateRandomString = require('../../services').generateRandomString;

const stateKey = 'spotify_auth_state';
const router = express.Router();

const client_id = `${process.env.CLIENT_ID}`;
const client_secret = `${process.env.CLIENT_SECRET}`;
const redirect_uri = `http://localhost:${process.env.PORT || 9004}/universify/callback`;

router.use(express.static('./public'));

router.get('/login', (req, res) => {
    const state = generateRandomString(16);
    
	res.cookie(stateKey, state);

    const scope = 'user-read-private user-read-email';
    
	res.redirect('https://accounts.spotify.com/authorize?' +
		querystring.stringify({
			response_type: 'code',
			client_id: client_id,
			scope: scope,
			redirect_uri: redirect_uri,
			state: state
        })
    );
});

router.get('/callback', (req, res) => {
	const code = req.query.code || null;
	const state = req.query.state || null;
	const storedState = req.cookies ? req.cookies[stateKey] : null;

	if(state === null || state !== storedState) {
		res.redirect('/#/' +
			querystring.stringify({
				error: 'state_mismatch'
            })
        );
	}else{
		res.clearCookie(stateKey);

		const authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			form: {
				code: code,
				redirect_uri: redirect_uri,
				grant_type: 'authorization_code'
			},
			headers: {
				'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
			},
			json: true
		};

		request.post(authOptions, (error, response, body) => {
			if(!error && response.statusCode === 200){
				const access_token = body.access_token,
						refresh_token = body.refresh_token;

				res.redirect('http://localhost:3000/search/#/' +
					querystring.stringify({
						access_token: access_token,
						refresh_token: refresh_token
                    })
                );
			}else{
				res.redirect('/#/' +
					querystring.stringify({
						error: 'invalid_token'
                    })
                );
			}
		});
	}
});

router.get('/refresh_token', (req, res) => {
    const refresh_token = req.query.refresh_token;
    
	const authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
		form: {
			grant_type: 'refresh_token',
			refresh_token: refresh_token
		},
		json: true
	};

	request.post(authOptions, function(error, response, body) {
		if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            
			res.send({
				'access_token': access_token
			});
		}
	});
});

module.exports = router;