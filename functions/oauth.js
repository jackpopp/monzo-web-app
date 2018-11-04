exports.handler = function(event, context, callback) {
    const CLIENT_ID = `${CLIENT_ID}`;
    const REDIRECT_URL = `${REDIRECT_URL}`;
    const STATE_TOKEN = event.queryStringParameters.state;
    const AUTH_URL = `https://auth.monzo.com/?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&state=${STATE_TOKEN}`;

    callback(null, {
        statusCode: 302,
        headers: {
            Location: AUTH_URL
        }
    });
}
