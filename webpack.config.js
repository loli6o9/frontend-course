const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const ESLintPlugin = require( 'eslint-webpack-plugin' );
const StylelintPlugin = require( 'stylelint-webpack-plugin' );

const { NODE_ENV, HOST, PORT } = process.env;
const isDev = NODE_ENV === 'development';
const mode = isDev ? 'development' : 'production';
const host = HOST || 'localhost';
const port = PORT || 3000;
const buildPath = path.resolve( __dirname, 'build' );

module.exports = {
    mode,
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: buildPath,
        publicPath: '',
    },
    devServer: {
        contentBase: buildPath,
        compress: true,
        overlay: {
            warnings: true,
            errors: true,
        },
        host,
        port,
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin( {
            filename: 'index.html',
            template: 'src/assets/html/views/index.html',
        } ),
        new CleanWebpackPlugin(),
        new ESLintPlugin(),
        new StylelintPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: '> 1%, last 2 versions, not dead',
                                    useBuiltIns: 'usage',
                                    loose: true,
                                    corejs: 3,
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.scss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img',
                            esModule: false,
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve( __dirname, 'src/' ),
        },
    },
};