var path = require('path');

module.exports = {
    target: 'node',
    entry: {
        app: ['regenerator-runtime/runtime.js', 'node-fetch', './src/Blastream.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'blastream.js',
        library: 'Blastream',
        libraryTarget: 'umd'
    },
    mode: 'development',
    resolve: {
        mainFields: ["main"],
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'babel-loader',
            query: {
                presets: ['env']
            }
        }]
    }
};
