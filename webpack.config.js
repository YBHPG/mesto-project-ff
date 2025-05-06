const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // Точка входа
    entry: './src/scripts/index.js',

    // Выходной файл
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        assetModuleFilename: 'assets/[name][ext]',
        publicPath: '', // или '/имя-репозитория/' если требуется
    },

    // Режим разработки по умолчанию
    mode: 'development',

    // Настройки devServer
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        open: true,
        compress: true,
        port: 8080,
    },

    // Модули
    module: {
        rules: [
            // Обработка JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            // Обработка CSS
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            // Обработка изображений
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource',
            },
            // Обработка шрифтов
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
            // Обработка HTML
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
        ],
    },

    // Плагины
    plugins: [
        new CleanWebpackPlugin(), // Очищает папку dist перед сборкой
        new HtmlWebpackPlugin({
            template: './src/pages/index.html', // Шаблон HTML
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css', // Выходной файл CSS
        }),
    ],
};