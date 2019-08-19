const path = require('path')
const webpack = require('webpack')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const getHappypacks = require('./happypack.plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function getPostCssLoader(isDev) {
  return [
    !isDev && MiniCssExtractPlugin.loader,
    'happypack/loader?id=postcss-loader',
  ].filter(Boolean)
}

module.exports = function(mode) {
  const isDev = mode == 'development'
  return {
    context: resolve('/'),
    devtool: 'inline-source-map',
    module: {
      rules: [
        // {
        //   test: /\.js/,
        //   include: [resolve('example'), /\/node_modules\/react-native-svg/],
        //   use: {
        //     loader: 'babel-loader',
        //     options: {
        //       presets: ['@babel/preset-env'],
        //       plugins: [
        //         '@babel/plugin-transform-react-jsx',
        //         '@babel/plugin-transform-runtime',
        //         ['@babel/plugin-proposal-decorators', { legacy: true }],
        //       ],
        //       cacheDirectory: true,
        //     },
        //   },
        // },
        {
          test: /\.(tsx?|jsx?)/,
          include: [resolve('example'), resolve('src')],
          use: ['happypack/loader?id=ts-loader'],
        },
        {
          test: /\.(ttf|otf|eot|woff(?:2)?)(\?[a-z0-9]+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10 * 1024,
                name: 'font/[name].[hash:8].[ext]',
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          exclude: resolve('example/svgs'),
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 3 * 1024,
                name: 'svg/[name].[hash:8].[ext]',
              },
            },
          ],
        },
        // {
        //   test: /\.svg$/,
        //   include: resolve('example/svgs'),
        //   use: [
        //     {
        //       loader: '@svgr/webpack',
        //       options: {
        //         native: true,
        //       },
        //     },
        //     'file-loader',
        //   ],
        // },
        {
          test: /\.(jpe?g|png|gif|ogg|mp3)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 5 * 1024,
                name: 'img/[name].[hash:8].[ext]',
              },
            },
          ],
        },
        {
          test: /\.css$|\.scss/,
          use: getPostCssLoader(isDev),
        },
      ],
    },
    resolve: {
      alias: {
        '@': resolve('example'),
        '@p': resolve('example/pages'),
        '@c': resolve('example/components'),
        '@s': resolve('example/stores'),
        // style: resolve('example/styles'),
      },
      extensions: ['.ts', '.tsx', '.js', '.json', 'scss'],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      ...getHappypacks(isDev),
      isDev &&
        new ForkTsCheckerWebpackPlugin({
          checkSyntacticErrors: true,
          ignoreLintWarnings: true,
          reportFiles: ['example/**/*'],
          eslint: true,
        }),
      isDev &&
        new ForkTsCheckerNotifierWebpackPlugin({
          title: 'Typescript error',
        }),
      !isDev &&
        new MiniCssExtractPlugin({
          filename: 'css/main.css',
          chunkFilename: 'css/[name].[chunkhash:8].css',
        }),
    ].filter(Boolean),
  }
}
