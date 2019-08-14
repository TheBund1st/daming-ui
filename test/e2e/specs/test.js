// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL
    console.log('devServer', devServer)
    
    browser
      .url(devServer)
      .waitForElementVisible('#root', 15000)
      .assert.elementPresent('#root')
    // .assert.containsText('h1', 'Welcome to Your Vue.js App')
    // .end()
  },
}
