// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'happy pass': async function(browser) {
    const devServer = browser.globals.devServerURL
    console.log('devServer', devServer)

    let result = browser
      .url(devServer)
      .waitForElementVisible('#root', 2000)
      .setValue('.smsv-phone-number-container input', '18522223333')

    // check fetch code btn enable
    result.expect.element('.smsv-code-verification-container button').to.be
      .enabled

    result
      .click('.smsv-code-verification-container button')
      .setValue('.smsv-code-verification-container input', '2333')

    result.elements(
      'css selector',
      '.smsv-agreement-container .smsv-agreement-pretext',
      preText => {
        preText.value.forEach(x => {
          result.elementIdClick(x.ELEMENT)
        })

        // check verify btn enable
        result.expect.element('.smsv-submit-button-container button').to.be
          .enabled

        result
          .click('.smsv-submit-button-container button')
          // check error message area
          .expect.element('.smsv-error-message-container').to.not.be.present

        result.end()
      }
    )
  },
}
