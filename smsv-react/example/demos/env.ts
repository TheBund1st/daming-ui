let smsv
if (process.env.PKG_ENV === 'lib') {
  smsv = require('../../es/index')
} else {
  smsv = require('../../src/index')
}
export default smsv
