const config = require('../config')
const container = require('./di').createContainer(config)

container.mariapool.query('SELECT id FROM builds')
  .then (res => {
    console.log('good', res)
    process.exit(0)
  })
  .catch (err => {
    console.error('Fatal Error', err)
    process.exit(1)
  })
