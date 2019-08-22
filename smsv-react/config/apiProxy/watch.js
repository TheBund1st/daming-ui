const fs = require('fs')
const path = require('path')
const config = require('./config')

let watch = { config }

fs.watchFile(path.resolve(__dirname, './config.js'), () => {
  delete require.cache[require.resolve('./config')]
  try {
    const newProxyConfig = require('./config')
    if (watch.config.target !== newProxyConfig.target) {
      console.log(
        'Proxy target changed, now api proxy to: ',
        newProxyConfig.target
      )
      watch.config = newProxyConfig
    }
  } catch (e) {
    console.error('hot replace proxy fail')
  }
})

module.exports = watch
