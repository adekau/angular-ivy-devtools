const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        devtools: './extension/devtools',
        'content-script': './extension/content-scripts/content-script',
        'background-script': './extension/background-scripts/background-script',
        'ng-devtools': './extension/ng-devtools',
        popup: './extension/popup'
    },
    cache: true,
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'manifest.json', to: 'manifest.json' },
                { from: 'static/devtools.html', to: 'devtools.html' },
                { from: 'static/popup.html', to: 'popup.html' }
            ]
        })
    ]
};
