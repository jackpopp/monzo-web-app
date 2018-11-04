exports.handler = function(event, context, callback) {
    console.log(JSON.stringify(process.env));
    //const { CLIENT_ID, REDIRECT_URL } = process.env;
    const STATE_TOKEN = event.queryStringParameters.state;
    const AUTH_URL = `https://auth.monzo.com/?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&state=${STATE_TOKEN}`;

    callback(null, {
        statusCode: 302,
        headers: {
            Location: AUTH_URL
        }
    });
}
