const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const common = require('./common.config')
const merge = require('webpack-merge')
const prodConfig = merge(common(), {
  mode: 'production',
  bail: true,
  entry: {
    main: resolve('src/index.tsx'),
  },
  output: {
    path: resolve('lib/'),
    publicPath: '/',
    filename: 'js/main.js',
    libraryTarget: 'commonjs2',
  },
  stats: {
    cached: true,
    chunks: false,
    chunkModules: false,
    colors: true,
    modules: false,
  },
  optimization: {
    minimize: false,
    splitChunks: false,
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.HashedModuleIdsPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
})
module.exports = prodConfig
