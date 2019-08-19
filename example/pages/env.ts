let Smsv
if (process.env.NODE_ENV === 'development') {
  console.log('development')
  Smsv = require('../../lib/index.js')
} else if (process.env.NODE_ENV === 'debugger') {
  console.log('debugger')
  Smsv = require('../../src/index')
}
export default Smsv.default
