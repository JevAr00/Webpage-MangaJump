const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { dirname } = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/cliente/js/index.js',
        catalogo: './src/cliente/js/catalogo.js',
        compra: './src/cliente/js/compra.js',
        informacion: './src/cliente/js/informacion.js',
        formCompra: './src/cliente/js/formCompra.js'
    },
    /*output: {
        path:path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },*/
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin ({
            template: './src/cliente/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        }),
        new htmlWebpackPlugin ({
            template: './src/cliente/catalogo.html',
            inject: true,
            chunks: ['catalogo'],
            filename: 'catalogo.html'
        }),
        new htmlWebpackPlugin ({
            template: './src/cliente/compra.html',
            inject: true,
            chunks: ['compra'],
            filename: 'compra.html'
        }),
        new htmlWebpackPlugin ({
            template: './src/cliente/informacion.html',
            inject: true,
            chunks: ['informacion'],
            filename: 'informacion.html'
        }),
        new htmlWebpackPlugin ({
            template: './src/cliente/formCompra.html',
            inject: true,
            chunks: ['formCompra'],
            filename: 'formCompra.html'
        })
    ]
};