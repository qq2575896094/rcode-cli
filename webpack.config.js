const ip = require('ip')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const pathConf = require('./path-conf')

const isProd = process.env.NODE_ENV === 'production'

const publicPath = isProd ? './' : '/'

const devServer = {
    host: ip.address(),
    port: 8899,
    open: true,
    hot: true,
    static: {
        directory: pathConf.TMP_PATH,
    },
    historyApiFallback: true,
    compress: true,
    proxy: {
        '/users': 'http://localhost:8080',
    },
}

const styleLoader = (isProduction) => (isProduction
    ? { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } }
    : { loader: 'style-loader' })

module.exports = {
    mode: isProd ? 'production' : 'development',
    cache: !isProd,
    devtool: isProd ? undefined : 'source-map',
    entry: pathConf.ENTRY_PATH,
    output: {
        publicPath,
        filename: 'scripts/[name]-[contenthash:8].js',
        path: isProd ? pathConf.DIST_PATH : pathConf.TMP_PATH,
        // assetModuleFilename: "images/[name].[hash:8][ext]",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    { loader: 'babel-loader' },
                ],
                include: pathConf.APP_PATH,
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/,
                include: pathConf.APP_PATH,
                use: [
                    styleLoader(isProd),
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' },
                ],
            },
            {
                test: /\.less$/,
                include: pathConf.APP_PATH,
                use: [
                    styleLoader(isProd),
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                    { loader: 'less-loader' },
                ],
            },
            {
                test: /\.css$/,
                include: pathConf.APP_PATH,
                use: [
                    styleLoader(isProd),
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                ],
            },
            {
                test: /\.(woff|woff2|otf|ttf|eot|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            publicPath: './',
                            limit: 8 * 1024,
                            name: 'fonts/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            mimetype: 'image/png',
                            outputPath: 'images/',
                            esModule: false,
                            limit: 8 * 1024,
                            name: '[name]-[hash:8].[ext]',
                        },
                    },
                ],
                type: 'javascript/auto'
            },
        ]
    },
    optimization: {
        minimize: isProd,
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        { discardComments: { removeAll: true } }
                    ]
                },
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'rcode cli',
            filename: 'index.html',
            template: './src/index.html',
            favicon: './src/images/favicon.ico',
            meta: {
                viewport: 'width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no',
                description: 'Web site created using rcode-cli',
                'theme-color': '#4285f4',
            },
            inject: true,
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: isProd ? 'css/[name]-[contenthash:8].css' : '[name].css',
            chunkFilename: isProd ? 'css/[name]-[contenthash:8].css' : '[name].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: pathConf.DOC_FROM_PATH,
                    to: pathConf.DOC_TO_PATH,
                },
                // {
                //     from: pathConf.IMAGE_FROM_PATH,
                //     to: pathConf.IMAGE_TO_PATH,
                // },
            ],
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                '!doc',
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': pathConf.APP_PATH,
            '@page': pathConf.PAGE_BASE_PATH,
            '@components': pathConf.COMPONENT_PATH,
            '@fonts': pathConf.FONT_PATH,
        },
        extensions: ['.js', '.jsx', '.json'],
    },
    devServer: isProd ? undefined : devServer,
}
