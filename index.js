const express = require('express');
const needle = require('needle');
const fs = require('fs');

const REDIRECT_URL = 'http://localhost:7777';
const { CLIENT_ID, CLIENT_SECRET } = process.env;
const AUTH_URL = `https://auth.monzo.com/?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&state=$state_token`;
const ACCESS_TOKEN_URL = 'https://api.monzo.com/oauth2/token';
const PAGE = fs.readFileSync(`${__dirname}/index.html`, 'UTF-8');

const app = express();

app.listen(7777, () => console.log('Listening'));

app.use('/public', express.static('public'));

app.get('/', async (request, response) => {
    if (Object.keys(request.query).length === 0) {
        const stateToken = new Date().getTime();
        const uri = AUTH_URL.replace('$state_token', stateToken);
        console.log(uri);

        response.redirect(302, uri);
        return
    }

    response.send(PAGE);
});

app.get('/access-token', async (request, response) => {
    if (request.query.code && request.query.state) {
        try {
            const result = await needle('post', ACCESS_TOKEN_URL, {
                grant_type: 'authorization_code',
                client_id: CLIENT_ID,
                redirect_uri: REDIRECT_URL,
                client_secret: CLIENT_SECRET,
                code: request.query.code
            });

            console.log(result.body);

            response.json(result.body);
        } catch (e) {
            response.status(500).json({ error: e });
        }
    } else {
        response.status(500).json({ error: e });
    }
});
