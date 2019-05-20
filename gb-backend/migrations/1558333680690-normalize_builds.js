'use strict'
const Bluebird = require('bluebird')
const config = require('../config')
const { createContainer } = require('../src/di')
const container = createContainer(config)

const idCol = 'id int not null auto_increment primary key'

const query = (sql, params) => {
  console.log('sql:', sql)
  return container.mariapool.query(sql, params)
}

/* These functions are used for migrating our data */

/* Returns an Array */
const getUniqueValues = fieldNames => Bluebird.map(
    fieldNames,
    fieldName => query(`
        select distinct ${fieldName} from builds
      `)
      .then(([rows]) =>
        rows.map(row => row[fieldName])
      ),
    { concurrency: 1 }
  )
  .then(valueses => {
    const values = {}
    valueses.forEach(values =>
      values.forEach(value =>
        values[value] = undefined
      )
    )
    return Object.keys(values)
  })

/* Returns an Array */
const getUniqueCommaSeparatedValues = fieldName => query(`
    select distinct ${fieldName} from builds
  `)
  .then(([rows]) => {
    const values = {}
    rows.forEach(row => row
      .map(row => row[fieldName].trim())
      .filter(value => value)
      .forEach(value =>
        values[row[fieldName]] = undefined
      )
    )
    return Object.keys(values)
  })

const getCode = value => value.toLowerCase().replace(/\s\+/g, '-')

/* */
const salvageValues = (values, tableName) =>
  Bluebird.map(
    values,
    value => query(
      `insert into ${tableName} (code, label) values (?, ?)`,
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

/* These functions are used for manipulating table schema */

const createCodeAndLabelTable = name =>
  query(`
    create table if not exists ${name} (
      ${idCol},
      code varchar(255) not null,
      label varchar(255) not null,
      unique key uniq_code (code)
    )
    charset=latin1
  `)

const createManyToManyTable = name => query(`
  create table if not exists build_character_${name} (
    build_id int not null,
    ${name}_id int not null,
    constraint fk_build_id foreign key (build_id) references build (id),
    constraint fk_${name}_id foreign key (${name}_id) references ${name} (id),
    primary key (build_id, ${name}_id)
  )
`)

const dropTable = name =>
  query(`drop table if exists ${name}`)

/* */

module.exports.up = function (next) {
  createCodeAndLabelTable('character_class')
  .then(() => createCodeAndLabelTable('character_mastery'))
  .then(() => createCodeAndLabelTable('character_damage_type'))
  .then(() => createCodeAndLabelTable('character_active_skill'))
  .then(() => createCodeAndLabelTable('character_passive_skill'))
  .then(() => createCodeAndLabelTable('character_play_style'))
  .then(() => createCodeAndLabelTable('game_version'))
  .then(() => createCodeAndLabelTable('character_gearreq'))
  .then(() => createCodeAndLabelTable('character_cruci'))
  .then(() => createCodeAndLabelTable('character_sr_level'))
  .then(() => createCodeAndLabelTable('character_purpose'))
  .then(() => query(`
    create table if not exists build (
      ${idCol},
      charname int not null,
      class int not null,
      mastery_id_1 int not null,
      mastery_id_2 int not null,
      damage_type_id int not null,
      play_style_id int not null,
      game_version_id int not null,
      gearreq_id int not null,
      cruci_id int not null,
      sr_level_id int not null,
      guide varchar(4096) not null,
      author varchar(255) default null,
      primaryskill int not null,
      link varchar(255) default null,
      purpose_id int not null,
      blurb varchar(1024) default null,
      constraint fk_version foreign key (game_version_id) references game_version (id),
      constraint fk_gearreq foreign key (gearreq_id) references character_gearreq (id),
      constraint fk_cruci foreign key (cruci_id) references character_cruci (id),
      constraint fk_srlevel foreign key (sr_level_id) references character_sr_level (id),
      /* TODO check with seth */
      constraint fk_primaryskill foreign key (primaryskill) references character_active_skill (id)
    )
  `))
  .then(() => createManyToManyTable('active_skill'))
  .then(() => createManyToManyTable('passive_skill'))
  .then(() => getUniqueValues(['mastery1', 'mastery2']))
  .then(values => salvageValues(values, 'character_mastery'))
  .then(() => getUniqueValues(['damagetype']))
  .then(values => salvageValues(values, 'character_damagetype'))
  .then(() => getUniqueValues(['playstyle']))
  .then(values => salvageValues(values, 'character_play_style'))
  .then(() => getUniqueValues(['version']))
  .then(values => salvageValues(values, 'game_version'))
  .then(() => getUniqueValues(['gearreq']))
  .then(values => salvageValues(values, 'character_gearreq'))
  .then(() => getUniqueValues(['cruci']))
  .then(values => salvageValues(values, 'character_cruci'))
  .then(() => getUniqueCommaSeparatedValues(['activeskills']))
  .then(values => salvageValues(values, 'character_active_skill'))
  .then(() => getUniqueCommaSeparatedValues(['passiveskills']))
  .then(values => salvageValues(values, 'character_passive_skill'))
  .then(() => next())
  .catch(next)
}

module.exports.down = function (next) {
  dropTable('character_class')
  .then(() => dropTable('character_mastery'))
  .then(() => dropTable('character_damagetype'))
  .then(() => dropTable('character_active_skill'))
  .then(() => dropTable('character_passive_skill'))
  .then(() => dropTable('character_play_style'))
  .then(() => dropTable('game_version'))
  .then(() => dropTable('character_gearreq'))
  .then(() => dropTable('character_cruci'))
  .then(() => dropTable('character_sr_level'))
  .then(() => dropTable('character_purpose'))
  .then(() => dropTable('build'))
  .then(() => dropTable('build_character_active_skill'))
  .then(() => dropTable('build_character_passive_skill'))
  .then(() => next())
  .catch(next)
}
