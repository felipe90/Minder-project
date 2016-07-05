var path = require('path');

module.exports = {
    entry: './entry.js',
    output : {
        path : './dist/js/',
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        port: 3333,
    },
    module: {
        loaders : [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets : ['es2015','angular']
                }
            },
            { 
                test : /\.css$/,
                loaders : [ "style", "css" ],
            },
            {
                test : /\.(jpg|png)$/,
                loader : "file-loader?name=[name].[ext]",
            },
            { 
                test: /\.html$/, 
                loader: "file-loader?name=html-[hash:6].html"
            }
        ]
    }
}

