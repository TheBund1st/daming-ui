let smsv
if (process.env.RUNTIME_ENV === 'development') {
  console.log('use lib')
  smsv = require('../../es/index')
} else {
  console.log('use src')
  smsv = require('../../src/index')
}
export default smsv
