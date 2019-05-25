'use strict'
/* This migration salvages individual values from the old prototype table,
 * including the comma-separated fields, and puts them into their new normalized homes.
 *
 * TODO either in this migration or in a subsequent migration, we should
 * populate these tables with authoritative values.
 */
const Bluebird = require('bluebird')
const R = require('ramda')
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

const getMasteryPairKey = (a, b) => {
  if (b > a) {
    const c = a
    a = b
    b = c
  }
  return `${getCode(a)}-${getCode(b)}`
}

/* Determine data to populate into `character_class` table */
const getClasses = () =>
  Bluebird.join(
    query(`select id, mastery1, mastery2, class from builds_renamed`),
    query('select id, code from character_mastery'),
    ([builds], [masteries]) => {
      const masteryIdByCode = {}
      masteries.forEach(({ code, id }) =>
        masteryIdByCode[code] = id
      )
      const classByMasteries = {}
      builds.forEach(({id, mastery1, mastery2, class: klass}) => {
        const masteryCode1 = getCode(mastery1)
        const masteryCode2 = getCode(mastery2)
        const masteryPairKey = getMasteryPairKey(
          masteryCode1, masteryCode2
        )
        if (masteryPairKey in classByMasteries)
          return
        let mastery_id_1 = masteryIdByCode[masteryCode1]
        let mastery_id_2 = masteryIdByCode[masteryCode2]
        if (mastery_id_1 > mastery_id_2) {
          const c = mastery_id_1
          mastery_id_1 = mastery_id_2
          mastery_id_2 = c
        }
        classByMasteries[masteryPairKey] = {
          mastery_id_1,
          mastery_id_2,
          code: getCode(klass),
          label: klass,
        }
      })
      return R.values(classByMasteries)
    }
  )

const insertClasses = classes => Bluebird.map(
  classes,
  c => query(`
    insert into character_class set
      mastery_id_1=?,
      mastery_id_2=?,
      code=?,
      label=?
  `, [
    c.mastery_id_1,
    c.mastery_id_2,
    c.code,
    c.label
  ]),
  { concurrency: 1 }
)

module.exports.up = function (next) {
  Promise.resolve()
  .then(() => doesBuildsRenamedExist())
  .then(yes =>
    yes && Promise.resolve()
    .then(() => getUniqueValues(['mastery1', 'mastery2']))
    .then(values => salvageValues(values, 'character_mastery'))
    .then(() => getClasses())
    .then(classes => insertClasses(classes))
    .then(() => getUniqueValues(['damagetype']))
    .then(values => salvageValues(values, 'character_damage_type'))
    .then(() => getUniqueValues(['playstyle']))
    .then(values => salvageValues(values, 'character_play_style'))
    .then(() => getUniqueValues(['version']))
    .then(values => salvageValues(values, 'game_version'))
    .then(() => getUniqueValues(['gearreq']))
    .then(values => salvageValues(values, 'character_gearreq'))
    .then(() => getUniqueValues(['srlevel']))
    .then(values => salvageValues(values, 'character_sr_level'))
    .then(() => getUniqueValues(['cruci']))
    .then(values => salvageValues(values, 'character_cruci'))
    .then(() => getUniqueValues(['purpose']))
    .then(values => salvageValues(values, 'character_purpose'))
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
  .then(() => deleteFrom('character_class'))
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
