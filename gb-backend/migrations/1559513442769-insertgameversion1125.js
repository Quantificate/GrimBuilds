'use strict'
const config = require('../config')
const { createContainer } = require('../src/di')

const container = createContainer(config)

module.exports.up = function (next) {
  return container.mariapool.query(`
    insert into game_version (code, label) values ('1.1.2.5', '1.1.2.5')
    `)
  .then(() => next())
  .catch(next)
}

module.exports.down = function (next) {
  return container.mariapool.query(`
    delete from game_version where code = '1.1.2.5'
    `)
  .then(() => next())
  .catch(next)
}
