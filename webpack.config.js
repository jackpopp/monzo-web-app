module.exports = {
    entry: {
        accessToken: `${__dirname}/functions/accessToken.js`,
        oauth: `${__dirname}/functions/oauth.js`
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist/functions',
        library: 'handler'
    },
    node: {
        fs: 'empty'
      }
}
