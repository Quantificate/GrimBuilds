const R = require('ramda')
module.exports = R.mergeDeepRight(
  require('./defaults'),
  require('./local')
)
