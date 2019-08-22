let smsv
if (process.env.RUNTIME_ENV === 'development') {
  smsv = require('../../es/index')
} else {
  smsv = require('../../src/index')
}
export default smsv
