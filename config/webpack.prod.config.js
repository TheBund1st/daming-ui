const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin

const common = require('./common.config')
const merge = require('webpack-merge')

module.exports = merge(common(), {
  mode: 'production',
  bail: true,
  stats: {
    cached: false,
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
