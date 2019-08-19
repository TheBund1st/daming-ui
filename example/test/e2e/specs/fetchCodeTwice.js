// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
const {
  smsv_selector,
  smsv_validPhone,
  smsv_validPhone2,
  smsv_tooManyRequest,
} = require('../utils/variable')

module.exports = {
  'TODO: fetch code and waiting for the countdown': function(browser) {
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
  'TODO: change phone while waiting for the countdown': function(browser) {
    const devServer = browser.globals.devServerURL

    let result = browser
      .url(devServer)
      .waitForElementVisible('#root', 2000)
      .setValue(smsv_selector.phoneInput, smsv_validPhone.number)
      .click(smsv_selector.fetchCodeBtn)

    // check fetch code btn enable after click
    result.expect.element(smsv_selector.fetchCodeBtn).to.not.be.enabled

    result.setValue(smsv_selector.phoneInput, smsv_validPhone2.number)

    // fetch btn should be enable after change phone
    result.expect.element(smsv_selector.fetchCodeBtn).to.be.enabled

    result.end()
  },
  'fetch code too many request by server': function(browser) {
    const devServer = browser.globals.devServerURL

    let result = browser
      .url(devServer)
      .waitForElementVisible('#root', 2000)
      .setValue(smsv_selector.phoneInput, smsv_tooManyRequest.number)
      .click(smsv_selector.fetchCodeBtn)

    result
      .click(smsv_selector.fetchCodeBtn)
      .waitForElementVisible(smsv_selector.errorMsgContainer, 500)

    result.end()
  },
}
