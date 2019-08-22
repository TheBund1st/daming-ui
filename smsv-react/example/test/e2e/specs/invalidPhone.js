// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
const { smsv_selector, smsv_invalidPhone } = require('../utils/variable')

module.exports = {
  'invalid phone format': function(browser) {
    const devServer = browser.globals.devServerURL

    let result = browser
      .url(devServer)
      .waitForElementVisible('#root', 2000)
      .setValue(smsv_selector.phoneInput, '123test')

    // check fetch code btn not enable
    result.expect.element(smsv_selector.fetchCodeBtn).to.not.be.enabled

    // check verify btn not enable
    result.expect.element(smsv_selector.verifyBtn).to.not.be.enabled

    // check msg container
    result.expect.element(smsv_selector.errorMsgContainer).to.not.be.present

    result.end()
  },
  'unregister phone': function(browser) {
    const devServer = browser.globals.devServerURL

    let result = browser
      .url(devServer)
      .waitForElementVisible('#root', 2000)
      .setValue(smsv_selector.phoneInput, smsv_invalidPhone.number)

    // check fetch code btn enable
    result.expect.element(smsv_selector.fetchCodeBtn).to.be.enabled

    result.click(smsv_selector.fetchCodeBtn)

    // check verify btn not enable
    result.expect.element(smsv_selector.verifyBtn).to.not.be.enabled // check msg container

    result.waitForElementVisible(smsv_selector.errorMsgContainer, 500)

    result.end()
  },
}
