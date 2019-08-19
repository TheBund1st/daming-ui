let Smsv
if (process.env.RUNTIME_ENV === 'development') {
  Smsv = require('../../lib/index.js')
} else if (process.env.RUNTIME_ENV === 'debugger') {
  Smsv = require('../../src/index')
}
export default Smsv.default
