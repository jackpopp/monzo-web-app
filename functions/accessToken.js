const needle = require('needle');

exports.handler = function(event, context, callback) {
    const CLIENT_ID = `${process.env.CLIENT_ID}`;
    const CLIENT_SECRET = `${process.env.CLIENT_SECRET}`;
    const REDIRECT_URL = `${process.env.REDIRECT_URL}`;
    const ACCESS_TOKEN_URL = 'https://api.monzo.com/oauth2/token';
    const CODE = event.queryStringParameters.code;

    if (request.query.code && request.query.state) {
        try {
            const result = await needle('post', ACCESS_TOKEN_URL, {
                grant_type: 'authorization_code',
                client_id: CLIENT_ID,
                redirect_uri: REDIRECT_URL,
                client_secret: CLIENT_SECRET,
                code: CODE
            });
    
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(result)
            });
        } catch (e) {
            callback(null, {
                statusCode: 500,
                body: JSON.stringify({ error: e })
            });
        }
    }

    callback(null, {
        statusCode: 500,
        body: JSON.stringify({ error: 'No code provided' })
    });
}
