'use strict'
const config = require('../config')
const { createContainer } = require('../src/di')

const container = createContainer(config)

module.exports.up = function (next) {
  container.mariapool.query(`
    insert into character_cruci (code, label) values ('crucible-15', 'Crucible 15+'), ('crucible-25', 'Crucible 25+'), ('crucible-50', 'Crucible 50+'), ('crucible-75', 'Crucible 75+'), ('crucible-125', 'Crucible 125+')
  `)
  .then(() => next())
  .catch(next)
}

module.exports.down = function (next) {
  container.mariapool.query(`
    delete from character_cruci where code = 'crucible-15' or code = 'crucible-25' or code = 'crucible-50' or code = 'crucible-75' or code = 'crucible-125'
  `)
  .then(() => next())
  .catch(next)
}
