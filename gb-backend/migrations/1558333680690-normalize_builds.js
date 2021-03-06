'use strict'
const Bluebird = require('bluebird')
const config = require('../config')
const { createContainer } = require('../src/di')
const container = createContainer(config)

const query = (sql, params) =>
  container.mariapool.query(sql, params)

const idCol = 'id int not null auto_increment primary key'

/* These functions are used for manipulating table schema */

const createCodeAndLabelTable = name =>
  query(`
    create table if not exists ${name} (
      ${idCol},
      code varchar(255) not null,
      label varchar(255) not null,
      unique key uniq_code (code)
    )
    charset=utf8
  `)

const createManyToManyTable = name => query(`
  create table if not exists build_character_${name} (
    build_id int not null,
    ${name}_id int not null,
    constraint fk_build_character_${name}_build_id foreign key (build_id) references build (id),
    constraint fk_${name}_id foreign key (${name}_id) references character_${name} (id),
    primary key (build_id, ${name}_id)
  )
`)

const dropTable = name =>
  query(`drop table if exists ${name}`)

const createCharacterClassTable = () =>
  query(`
    create table if not exists character_class (
      mastery_id_1 int not null,
      mastery_id_2 int not null,
      code varchar(255) not null,
      label varchar(255) not null,
      unique key uniq_character_class_code (code),
      constraint fk_character_class_mastery_1 foreign key (mastery_id_1) references character_mastery (id),
      constraint fk_character_class_mastery_2 foreign key (mastery_id_2) references character_mastery (id),
      /* TODO this constraint seems to be being ignored by
       * 10.0.38-MariaDB-0ubuntu0.16.04.1 */
      constraint chk_class_mastery_order
        check (mastery_id_1 < mastery_id_2),
      primary key (mastery_id_1, mastery_id_2)
     )
     charset=utf8
  `)

/* */

module.exports.up = function (next) {
  Promise.resolve()
  .then(() => createCodeAndLabelTable('character_mastery'))
  .then(() => createCharacterClassTable())
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
      charname varchar(255) not null,
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
      primary_skill_id int not null,
      link varchar(255) default null,
      purpose_id int not null,
      blurb varchar(1024) charset utf8 default null,
      constraint fk_build_version foreign key (game_version_id) references game_version (id),
      constraint fk_build_gearreq foreign key (gearreq_id) references character_gearreq (id),
      constraint fk_build_cruci foreign key (cruci_id) references character_cruci (id),
      constraint fk_build_srlevel foreign key (sr_level_id) references character_sr_level (id),
      /* TODO check with seth */
      constraint fk_build_primary_skill foreign key (primary_skill_id) references character_active_skill (id)
    )
  `))
  .then(() => createManyToManyTable('active_skill'))
  .then(() => createManyToManyTable('passive_skill'))
  .then(() => next())
  .catch(next)
}

module.exports.down = function (next) {
  Promise.resolve()
  .then(() => dropTable('character_class'))
  .then(() => dropTable('build_character_active_skill'))
  .then(() => dropTable('build_character_passive_skill'))
  .then(() => dropTable('build'))
  .then(() => dropTable('builds'))
  .then(() => dropTable('character_active_skill'))
  .then(() => dropTable('character_passive_skill'))
  .then(() => dropTable('character_cruci'))
  .then(() => dropTable('character_damage_type'))
  .then(() => dropTable('character_gearreq'))
  .then(() => dropTable('character_mastery'))
  .then(() => dropTable('character_play_style'))
  .then(() => dropTable('character_purpose'))
  .then(() => dropTable('character_sr_level'))
  .then(() => dropTable('game_version'))
  .then(() => next())
  .catch(next)
}
