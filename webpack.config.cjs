const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: require.resolve('./loader.cjs'),
                issuerLayer: "",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],
};
    