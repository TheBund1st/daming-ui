// const getConfig = require('react-scripts/config/webpack.config')
// const getDevServerOptions = require('react-scripts/config/webpackDevServer.config')
// const packageJson = require('../package.json')
// const proxy = packageJson.proxy

// const devServerOptions = getDevServerOptions(
//   [
//     () => {
//       return {
//         context: pathname =>
//           !!pathname.match('^/api') || !!pathname.match('^/log(in|out)'),
//         target: proxy,
//         changeOrigin: true,
//       }
//     },
//   ],
//   proxy
// )
// devServerOptions.port = 3000

// module.exports = {
//   devServerOptions,
//   devConfig: getConfig('development'),
//   prodConfig: getConfig('production'),
// }
