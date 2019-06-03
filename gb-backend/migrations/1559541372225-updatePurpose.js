'use strict'
const config = require('../config')
const { createContainer } = require('../src/di')

const container = createContainer(config)

module.exports.up = function (next) {
  container.mariapool.query(`
    insert into character_purpose (code, label) values ('leveling', 'Leveling')
  `)
  .then(() => next())
  .catch(next)
}

module.exports.down = function (next) {
  container.mariapool.query(`
    delete from character_purpose where code = 'leveling'
  `)
  .then(() => next())
  .catch(next)
}
