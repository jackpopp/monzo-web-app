module.exports = {
    entry: {
        app: `${__dirname}/main.js`
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    mode: "development",
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
}
