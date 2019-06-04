'use strict'
const config = require('../config')
const { createContainer } = require('../src/di')

const container = createContainer(config)

module.exports.up = function (next) {
  container.mariapool.query(`
    alter table build add column image varchar(255) not null default '/images/placehold.png'
    `)
  .then(() => next())
  .catch(next)
}

module.exports.down = function (next) {
  container.mariapool.query(`
    alter table build drop column image
    `)
  .then(() => next())
  .catch(next)
}
