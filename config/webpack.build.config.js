const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CreateFileWebpack = require('create-file-webpack')
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
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env.RUNTIME_ENV': JSON.stringify('build'),
    }),
    new CreateFileWebpack({
      // path to folder in which the file will be created
      path: 'lib',
      // file name
      fileName: 'index.js',
      // content of the file
      content: `import smsv from './js/main'
require('./css/main.css')
export default smsv
      `,
    }),
    // new BundleAnalyzerPlugin(),
  ],
})
module.exports = prodConfig
