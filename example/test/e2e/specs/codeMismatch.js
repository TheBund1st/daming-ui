// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
const { smsv_selector, smsv_codeMismatch } = require('../utils/variable')

module.exports = {
  'code mismatch': function(browser) {
    const devServer = browser.globals.devServerURL

    let result = browser
      .url(devServer)
      .waitForElementVisible('#root', 2000)
      .setValue(smsv_selector.phoneInput, smsv_codeMismatch.number)

    // check fetch code btn enable
    result.expect.element(smsv_selector.fetchCodeBtn).to.be.enabled

    result
      .click(smsv_selector.fetchCodeBtn)
      .setValue(smsv_selector.codeInput, smsv_codeMismatch.code)

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
