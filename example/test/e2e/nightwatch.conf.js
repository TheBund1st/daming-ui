require('babel-register')
var devConfig = require('../../../config/webpack.dev.config')

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['example/test/e2e/specs'],
  output_folder: 'example/test/e2e/reports',
  custom_assertions_path: ['example/test/e2e/custom-assertions'],
  test_workers: true,

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path,
      'webdriver.gecko.driver': require('geckodriver').path,
    },
  },

  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      globals: {
        devServerURL:
          'http://localhost:' + (process.env.PORT || devConfig.devServer.port),

        // it does not work !!!
        // abortOnAssertionFailure: true,

        after(browser, cb) {
          process.exit(0)
          cb()
        },
        afterEach(browser, cb) {
          if (!browser.currentTest.results.failed) {
            process.exit(0)
          } else {
            process.exit(1)
          }
          cb()
        },
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          w3c: false,
          args: ['headless'],
        },
      },
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
        'moz:firefoxOptions': {
          args: ['--headless'],
        },
      },
    },
  },
}
