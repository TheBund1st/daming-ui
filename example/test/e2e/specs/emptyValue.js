// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
const { smsv_selector, smsv_validPhone } = require('../utils/variable')

module.exports = {
  'empty phone': function(browser) {
    const devServer = browser.globals.devServerURL

    let result = browser
      .url(devServer)
      .waitForElementVisible('#root', 2000)
      .setValue(smsv_selector.phoneInput, '')
      .setValue(smsv_selector.codeInput, smsv_validPhone.code)

    // check empty phone
    result.expect.element(smsv_selector.phoneErrorMsg).to.be.present

    result.expect.element(smsv_selector.verifyBtn).to.not.be.enabled

    result.expect.element(smsv_selector.errorMsgContainer).to.not.be.present

    result.end()
  },
  'TODO: empty code': function(browser) {
    const devServer = browser.globals.devServerURL

    let result = browser
      .url(devServer)
      .waitForElementVisible('#root', 2000)
      .setValue(smsv_selector.codeInput, '')
      .setValue(smsv_selector.phoneInput, smsv_validPhone.number)

    // check empty code
    result.expect.element(smsv_selector.codeErrorMsg).to.be.present

    result.expect.element(smsv_selector.verifyBtn).to.not.be.enabled

    result.expect.element(smsv_selector.errorMsgContainer).to.not.be.present

    result.end()
  },
}
