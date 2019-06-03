'use strict'
const config = require('../config')
const { createContainer } = require('../src/di')

const container = createContainer(config)

module.exports.up = function (next) {
  container.mariapool.query(`
    insert into character_gearreq (code, label) values ('vendor-rep-blueprints', 'Vendor/Rep Blueprints'), ('vendor-dropped-blueprints', 'Vendor/Dropped Blueprints'), ('light-farming-legendaries', 'Light Farming Legendaries')
  `)
  .then(() => next())
  .catch(next)
}

module.exports.down = function (next) {
  container.mariapool.query(`
    delete from character_gearreq where code = 'vendor-rep-blueprints' or code = 'vendor-dropped-blueprints' or code = 'light-farming-legendaries'
  `)
  .then(() => next())
  .catch(next)
}
