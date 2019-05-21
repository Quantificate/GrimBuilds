'use strict'
/* This migration salvages individual values from the old prototype table,
 * including the comma-separated fields, and puts them into their new normalized homes.
 */
const Bluebird = require('bluebird')
const config = require('../config')
const { createContainer } = require('../src/di')
const container = createContainer(config)

const query = (sql, params) =>
  container.mariapool.query(sql, params)

/* These functions are used for migrating our data */

/* Resolves true or false */
const doesBuildsRenamedExist = () =>
  query('show tables like "builds_renamed"')
  .then(([rows]) =>
    !!rows.length
  )

/* Resolves an Array */
const getUniqueValues = fieldNames => Bluebird.map(
    fieldNames,
    fieldName => query(`
        select distinct ${fieldName} from builds_renamed
      `)
      .then(([rows]) =>
        rows.map(row => row[fieldName])
      ),
    { concurrency: 1 }
  )
  .then(valueses => {
    const allValues = {}
    valueses.forEach(values =>
      values.forEach(value =>
        allValues[value] = undefined
      )
    )
    return Object.keys(allValues)
  })

/* Resolves an Array */
const getUniqueCommaSeparatedValues = fieldName => query(`
    select distinct ${fieldName} from builds_renamed
  `)
  .then(([rows]) => {
    const values = {}
    rows.forEach(row =>
      row[fieldName].split(/,/g)
      .map(value => value.trim())
      .filter(value => value)
      .forEach(value =>
        values[value] = undefined
      )
    )
    return Object.keys(values)
  })

const getCode = value => value.toLowerCase()
  .replace(/[^a-zA-Z0-9_.-]+/g, '-')
  .replace(/^-*/, '')
  .replace(/-*$/, '')

/* */
const salvageValues = (values, tableName) =>
  Bluebird.map(
    values,
    value => query(
      `
        insert into ${tableName} (code, label)
        values (?, ?)
        on duplicate key update code=values(code)
      `,
      [ getCode(value), value ],
    ),
    { concurrency: 1 }
  )
  .then(() => query(`select * from ${tableName}`))
  .then(([rows]) => {
    const idByCode = {}
    rows.forEach(row =>
      idByCode[row.code] = row.id
    )
    return { idByCode }
  })

const deleteFrom = tableName =>
  query(`delete from ${tableName}`)

module.exports.up = function (next) {
  Promise.resolve()
  .then(() => doesBuildsRenamedExist())
  .then(yes =>
    yes && Promise.resolve()
    .then(() => getUniqueValues(['mastery1', 'mastery2']))
    .then(values => salvageValues(values, 'character_mastery'))
    .then(() => getUniqueValues(['damagetype']))
    .then(values => salvageValues(values, 'character_damage_type'))
    .then(() => getUniqueValues(['playstyle']))
    .then(values => salvageValues(values, 'character_play_style'))
    .then(() => getUniqueValues(['version']))
    .then(values => salvageValues(values, 'game_version'))
    .then(() => getUniqueValues(['gearreq']))
    .then(values => salvageValues(values, 'character_gearreq'))
    .then(() => getUniqueValues(['cruci']))
    .then(values => salvageValues(values, 'character_cruci'))
    .then(() => getUniqueCommaSeparatedValues('activeskills'))
    .then(values => salvageValues(values, 'character_active_skill'))
    .then(() => getUniqueCommaSeparatedValues('passiveskills'))
    .then(values => salvageValues(values, 'character_passive_skill'))
  )
  .then(() => next())
  .catch(next)
}

module.exports.down = function (next) {
  Promise.resolve()
  .then(() => deleteFrom('character_mastery'))
  .then(() => deleteFrom('character_damage_type'))
  .then(() => deleteFrom('character_play_style'))
  .then(() => deleteFrom('game_version'))
  .then(() => deleteFrom('character_gearreq'))
  .then(() => deleteFrom('character_cruci'))
  .then(() => deleteFrom('character_active_skill'))
  .then(() => deleteFrom('character_passive_skill'))
  .then(() => next())
  .catch(next)
}
