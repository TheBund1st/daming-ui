let Smsv
if (process.env.RUNTIME_ENV === 'development') {
  Smsv = require('../../lib/index').default
} else {
  Smsv = require('../../src/index').default
}
export default Smsv
