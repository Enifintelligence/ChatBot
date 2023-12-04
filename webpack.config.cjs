const path = require( 'path');

module.exports = { 
    mode: 'development',
    entry: './src/widgetstandalone.js',
    output: {
        filename: 'enif-standalone-script.js',
        library: 'enif',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
        {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-typescript'],
                },
            },
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
    },
}