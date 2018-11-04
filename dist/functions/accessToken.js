const fetch = require('node-fetch/lib/index');

exports.handler = function (event, context, callback) {
  const CLIENT_ID = `${process.env.CLIENT_ID}`;
  const CLIENT_SECRET = `${process.env.CLIENT_SECRET}`;
  const REDIRECT_URL = `${process.env.REDIRECT_URL}`;
  const ACCESS_TOKEN_URL = 'https://api.monzo.com/oauth2/token';
  const CODE = event.queryStringParameters.code;
  const STATE = event.queryStringParameters.state;

  if (CODE && STATE) {
    try {
      const data = {
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URL,
        client_secret: CLIENT_SECRET,
        code: CODE
      };
      fetch(ACCESS_TOKEN_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(result => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(result)
        });
      }).catch(e => {
        console.log(e);
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({
            error: `Error: ${e.message}`
          })
        });
      });
      /*const result = needle('post', ACCESS_TOKEN_URL, {
          grant_type: 'authorization_code',
          client_id: CLIENT_ID,
          redirect_uri: REDIRECT_URL,
          client_secret: CLIENT_SECRET,
          code: CODE
      }).then(() => {
          callback(null, {
              statusCode: 200,
              body: JSON.stringify(result)
          });
      }).catch((e) => {
          console.log(e)
          callback(null, {
              statusCode: 500,
              body: JSON.stringify({ error: `Error: ${e.message}` })
          });
      });*/
    } catch (e) {
      console.log(e);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: `Error: ${e.message}`
        })
      });
    }
  } else {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        error: 'No code provided'
      })
    });
  }
};