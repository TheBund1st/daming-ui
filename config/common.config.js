const path = require('path')
const webpack = require('webpack')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const getHappypacks = require('./happypack.plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')

const miniCss = new MiniCssExtractPlugin({
  filename: 'css/[name].[chunkhash:8].css',
  chunkFilename: 'css/[name].[chunkhash:8].css',
})

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
    entry: {
      main: resolve('src/index.tsx'),
    },
    output: {
      path: resolve('dist/'),
      publicPath: '/',
      // filename: 'js/[name].js',
      // chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
      // library: 'MyLibrary',
      // libraryTarget: 'amd',
      filename: 'helloMsg.min.js',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    // devtool: 'inline-source-map',
    module: {
      rules: [
        // {
        //   test: /\.js/,
        //   include: [resolve('src'), /\/node_modules\/react-native-svg/],
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
          include: resolve('src'),
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
          exclude: resolve('src/svgs'),
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
        //   include: resolve('src/svgs'),
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
        '@': resolve('src'),
        '@p': resolve('src/pages'),
        '@c': resolve('src/components'),
        '@s': resolve('src/stores'),
        // style: resolve('src/styles'),
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
          reportFiles: ['src/**/*'],
          eslint: true,
        }),
      isDev &&
        new ForkTsCheckerNotifierWebpackPlugin({
          title: 'Typescript error',
        }),
      !isDev && miniCss,
      // new HtmlWebpackPlugin({
      //   template: resolve('index.html'),
      //   filename: 'index.html',
      //   env: process.env.NODE_ENV,
      // }),
      // new InlineManifestWebpackPlugin(),
    ].filter(Boolean),
  }
}
