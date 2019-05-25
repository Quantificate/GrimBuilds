'use strict'
/* This migration salvages actual builds from builds_renamed, using values
 * populated into character_* and game_version tables in the previous
 * migration.
 */
const Bluebird = require('bluebird')
const config = require('../config')
const { createContainer } = require('../src/di')
const container = createContainer(config)

const query = (sql, params) =>
  container.mariapool.query(sql, params)

const getCode = value => value.toLowerCase()
  .replace(/[^a-zA-Z0-9_.-]+/g, '-')
  .replace(/^-*/, '')
  .replace(/-*$/, '')

/* Split a comma-separated value string and return all unique values
 * therein. */
const splitCsvs = csv => {
  const values = {}
  csv.split(/,/g)
  .map(value => value.trim())
  .filter(value => value)
  .forEach(value =>
    values[value] = undefined
  )
  return Object.keys(values)
}

/* Resolves true or false */
const doesBuildsRenamedExist = () =>
  query('show tables like "builds_renamed"')
  .then(([rows]) =>
    !!rows.length
  )

const deleteFrom = tableName =>
  query(`delete from ${tableName}`)

/* */
const getLegacyBuilds = () =>
  query('select * from builds_renamed')
  .then(([rows]) => rows)

const getIdByCode = tableName =>
  query(`select id, code from ${tableName}`)
  .then(([rows]) => {
    const rval = {}
    rows.forEach(({ code, id }) =>
      rval[code] = id
    )
    return rval
  })

const makeLegacyBuildMigrator = async () => {
  const masteryIdByCode = await getIdByCode('character_mastery')
  const damageTypeIdByCode = await getIdByCode('character_damage_type')
  const playStyleIdByCode = await getIdByCode('character_play_style')
  const gameVersionIdByCode = await getIdByCode('game_version')
  const gearreqIdByCode = await getIdByCode('character_gearreq')
  const cruciIdByCode = await getIdByCode('character_cruci')
  const srLevelIdByCode = await getIdByCode('character_sr_level')
  const purposeIdByCode = await getIdByCode('character_purpose')
  const activeSkillIdByCode = await getIdByCode('character_active_skill')
  const passiveSkillIdByCode = await getIdByCode('character_passive_skill')

  return async build => {
    const mastery_id_1 = masteryIdByCode[getCode(build.mastery1)]
    const mastery_id_2 = masteryIdByCode[getCode(build.mastery2)]
    const damage_type_id = damageTypeIdByCode[getCode(build.damagetype)]
    const play_style_id = playStyleIdByCode[getCode(build.playstyle)]
    const game_version_id = gameVersionIdByCode[getCode(build.version)]
    const gearreq_id = gearreqIdByCode[getCode(build.gearreq)]
    const cruci_id = cruciIdByCode[getCode(build.cruci)]
    const sr_level_id = srLevelIdByCode[getCode(build.srlevel)]
    const primary_skill_id = activeSkillIdByCode[getCode(build.primaryskill)]
    const purpose_id = purposeIdByCode[getCode(build.purpose)]
    const build_character_active_skills = splitCsvs(build.activeskills)
      .map(skillLabel => activeSkillIdByCode[getCode(skillLabel)])
    const build_character_passive_skills = splitCsvs(build.passiveskills)
      .map(skillLabel => passiveSkillIdByCode[getCode(skillLabel)])
    const [{ insertId: newBuildId }] = await query(`
      insert into build set
        charname = ?,
        mastery_id_1 = ?,
        mastery_id_2 = ?,
        damage_type_id = ?,
        play_style_id = ?,
        game_version_id = ?,
        gearreq_id = ?,
        cruci_id = ?,
        sr_level_id = ?,
        guide = ?,
        author = ?,
        primary_skill_id = ?,
        link = ?,
        purpose_id = ?,
        blurb = ?
    `, [
      build.charname,
      mastery_id_1,
      mastery_id_2,
      damage_type_id,
      play_style_id,
      game_version_id,
      gearreq_id,
      cruci_id,
      sr_level_id,
      build.guide,
      build.author,
      primary_skill_id,
      build.link,
      purpose_id,
      build.blurb,
    ])
    await Bluebird.map(
      build_character_active_skills,
      active_skill_id => query(`
        insert into build_character_active_skill set
          build_id = ?,
          active_skill_id = ?
      `, [
        newBuildId,
        active_skill_id
      ])
    )
    await Bluebird.map(
      build_character_passive_skills,
      passive_skill_id => query(`
        insert into build_character_passive_skill set
          build_id = ?,
          passive_skill_id = ?
      `, [
        newBuildId,
        passive_skill_id
      ])
    )
  }
}

const migrateLegacyBuild = build => {
  const newBuild = {
    id: build.id,
    charname: build.charname,
    class_id,
    mastery_id_1,
    mastery_id_2,
    damage_type_id,
    play_style_id,
    game_version_id,
    gearreq_id,
    cruci_id,
    sr_level_id,
    guide: builds.guide,
    author: build.author,
    link: build.link,
    purpose_id,
    blurb: build.blurb,
  }
}

module.exports.up = () =>
  Promise.resolve()
  .then(() => doesBuildsRenamedExist())
  .then(yes => yes && Bluebird.join(
      getLegacyBuilds(),
      makeLegacyBuildMigrator(),
      (legacyBuilds, migrateBuild) => Bluebird.map(
        legacyBuilds,
        migrateBuild,
        { concurrency: 1 }
      )
    )
  )

/* TODO delete from... */
module.exports.down = () =>
  Promise.resolve()
  .then(() => deleteFrom('build_character_active_skill'))
  .then(() => deleteFrom('build_character_passive_skill'))
  .then(() => deleteFrom('build'))
