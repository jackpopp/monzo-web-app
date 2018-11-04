module.exports = {
    entry: {
        accessToken: `${__dirname}/functions/accessToken.js`,
        oauth: `${__dirname}/functions/oauth.js`
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist/functions',
        libraryTarget: "commonjs"
    },
    target: "node",
    node: {
        fs: 'empty'
      }
}
