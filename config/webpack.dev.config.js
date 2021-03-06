const path = require('path')
const webpack = require('webpack')
const proxyWatch = require('./apiProxy/watch')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const common = require('./common.config')
const merge = require('webpack-merge')
const PORT = 3000
const HOST = '0.0.0.0'
const URL = `http://${HOST}:${PORT}`

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(common('development'), {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    main: resolve('example/index.tsx'),
  },
  output: {
    path: resolve('dist/'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
  },
  devServer: {
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    },
    hot: true,
    // enable HMR on the server
    compress: true,
    contentBase: resolve('example'),
    // match the output path
    port: PORT,
    host: HOST,
    publicPath: URL,
    historyApiFallback: true,
    proxy: [() => proxyWatch.config],
  },
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PKG_ENV': JSON.stringify(process.env.PKG_ENV),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      filename: 'index.html',
    }),
    new InlineManifestWebpackPlugin(),
    // enable HMR globally
  ],
})
