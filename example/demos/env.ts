let smsv
if (process.env.RUNTIME_ENV === 'development') {
  console.log('use lib')
  smsv = require('../../es/index').default
} else {
  console.log('use src')
  smsv = require('../../src/index').default
}
export default smsv
