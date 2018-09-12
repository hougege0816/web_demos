module.exports = {
    entry: './js/script.js',
    output: {
        path: __dirname,
        filename: './js/script-pub.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};