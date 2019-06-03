'use strict'
const config = require('../config')
const { createContainer } = require('../src/di')

const container = createContainer(config)

module.exports.up = function (next) {
  container.mariapool.query(`
    insert into character_sr_level (code, label) values ('sr-25', 'SR 25+')
  `)
  .then(() => next())
  .catch(next)
}

module.exports.down = function (next) {
  container.mariapool.query(`
    delete from character_sr_level where code = 'sr-25'
  `)
  .then(() => next())
  .catch(next)
}
