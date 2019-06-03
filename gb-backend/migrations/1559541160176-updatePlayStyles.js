'use strict'
const config = require('../config')
const { createContainer } = require('../src/di')

const container = createContainer(config)

module.exports.up = function (next) {
  container.mariapool.query(`
    insert into character_play_style (code, label) values ('2h-ranged', 'Two-Handed Ranged')
  `)
  .then(() => next())
  .catch(next)
}

module.exports.down = function (next) {
  container.mariapool.query(`
    delete from character_play_style where code = '2h-ranged'
  `)
  .then(() => next())
  .catch(next)
}
