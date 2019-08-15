// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
const { smsv_selector, smsv_validPhone } = require('../utils/variable')

module.exports = {
  'fetch code and waiting for the countdown': function(browser) {
    const devServer = browser.globals.devServerURL

    let result = browser
      .url(devServer)
      .waitForElementVisible('#root', 2000)
      .setValue(smsv_selector.phoneInput, smsv_validPhone.number)
      .click(smsv_selector.fetchCodeBtn)

    // check fetch code btn enable after click
    result.expect.element(smsv_selector.fetchCodeBtn).to.not.be.enabled

    result.timeoutsImplicitWait(1000 * 20, function() {
      // check fetch btn enable after 20s
      result.expect.element(smsv_selector.fetchCodeBtn).to.be.enabled

      result.end()
    })
  },
}
