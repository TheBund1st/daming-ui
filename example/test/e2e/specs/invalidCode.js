// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
const {
  smsv_selector,
  smsv_validPhone,
  smsv_invalidCode,
} = require('../utils/variable')

module.exports = {
  'invalid code format': function(browser) {
    // TODO: waiting for code format check
    const devServer = browser.globals.devServerURL

    let result = browser
      .url(devServer)
      .waitForElementVisible('#root', 2000)
      .setValue(smsv_selector.codeInput, '1234567')
      .setValue(smsv_selector.phoneInput, smsv_validPhone.number)

    // check invalid code format
    result.expect.element(smsv_selector.codeErrorMsg).to.be.present

    result.end()
  },
  'invalid code': function(browser) {
    const devServer = browser.globals.devServerURL

    let result = browser
      .url(devServer)
      .waitForElementVisible('#root', 2000)
      .setValue(smsv_selector.phoneInput, smsv_invalidCode.number)

    // check fetch code btn enable
    result.expect.element(smsv_selector.fetchCodeBtn).to.be.enabled

    result
      .click(smsv_selector.fetchCodeBtn)
      .setValue(smsv_selector.codeInput, smsv_invalidCode.code)

    result.elements('css selector', smsv_selector.agreementPretext, preText => {
      preText.value.forEach(x => {
        result.elementIdClick(x.ELEMENT)
      })

      // check verify btn enable
      result.expect.element(smsv_selector.verifyBtn).to.be.enabled

      result
        .click(smsv_selector.verifyBtn)
        // check error message area
        .waitForElementVisible(smsv_selector.errorMsgContainer, 500)

      result.end()
    })
  },
}
