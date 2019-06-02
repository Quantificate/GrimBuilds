const Bluebird = require('bluebird')
const first = ([rows]) => rows[0]
const getRows = ([rows]) => rows

module.exports.makeModel = (config, di) => {

  const getMasteryById = id => di.mariapool.query(
      'select id, code, label from character_mastery where id = ?',
      [id]
    ).then(first)

  const getDamageTypeById = id => di.mariapool.query(
      'select id, code, label from character_damage_type where id = ?',
      [id]
    ).then(first)

  const getPlaystyleById = id => di.mariapool.query(
      'select id, code, label from character_play_style where id = ?',
      [id]
    ).then(first)

  const getGameVersionById = id => di.mariapool.query(
      'select id, code, label from game_version where id = ?',
      [id]
    ).then(first)

  const getGearReqById = id => di.mariapool.query(
      'select id, code, label from character_gearreq where id = ?',
      [id]
    ).then(first)

  const getCruciById = id => di.mariapool.query(
      'select id, code, label from character_cruci where id = ?',
      [id]
    ).then(first)

  const getSrLevelById = id => di.mariapool.query(
      'select id, code, label from character_sr_level where id = ?',
      [id]
    ).then(first)

  const getPurposeById = id => di.mariapool.query(
      'select id, code, label from character_purpose where id = ?',
      [id]
    ).then(first)

  const makeGetByCodeFunc = tableName => code => di.mariapool.query(
    `select id, code, label from ${tableName} where code = ?`,
    [code]
  ).then(first)

  const getMasteryByCode = makeGetByCodeFunc('character_mastery')
  const getDamageTypeByCode = makeGetByCodeFunc('character_damage_type')
  const getPlaystyleByCode = makeGetByCodeFunc('character_play_style')
  const getGameVersionByCode = makeGetByCodeFunc('game_version')
  const getGearReqByCode = makeGetByCodeFunc('character_gear_req')
  const getCruciByCode = makeGetByCodeFunc('character_cruci')
  const getSrLevelByCode = makeGetByCodeFunc('character_sr_level')
  const getPurposeByCode = makeGetByCodeFunc('character_purpose')

  /* SPEED BUMP */

  const getClassByMasteryIds = (a, b) => di.mariapool.query(`
    select
      code,
      label
    from character_class
    where
      mastery_id_1 = least(?, ?) and
      mastery_id_2 = greatest(?, ?)
    `,
    [a, b, a, b]
  ).then(first)

  const getActiveSkillById = id => di.mariapool.query(`
        select
          id,
          code,
          label
        from character_active_skill
        where id = ?`,
      [id]
    ).then(first)

  const getActiveSkillsByBuildId = id => di.mariapool.query(`
        select
          cas.id,
          cas.code,
          cas.label
        from build_character_active_skill bcas
        join character_active_skill cas
          on cas.id = bcas.active_skill_id
        where
          bcas.build_id = ?
      `,
      [id]
    )
    .then(getRows)

  const getPassiveSkillsByBuildId = id => di.mariapool.query(`
        select
          cps.id,
          cps.code,
          cps.label
        from build_character_passive_skill bcps
        join character_passive_skill cps
          on cps.id = bcps.passive_skill_id
        where
          bcps.build_id = ?
      `,
      [id]
    )
    .then(getRows)

  const hydrateBuildRow = build =>
    Bluebird.props({
      mastery1: getMasteryById(build.mastery_id_1),
      mastery2: getMasteryById(build.mastery_id_2),
      damageType: getDamageTypeById(build.damage_type_id),
      playstyle: getPlaystyleById(build.play_style_id),
      gameVersion: getGameVersionById(build.game_version_id),
      gearreq: getGearReqById(build.gearreq_id),
      cruci: getCruciById(build.cruci_id),
      srLevel: getSrLevelById(build.sr_level_id),
      activeSkills: getActiveSkillsByBuildId(build.id),
      passiveSkills: getPassiveSkillsByBuildId(build.id),
      primarySkill: getActiveSkillById(build.primary_skill_id),
      class: getClassByMasteryIds(build.mastery_id_1, build.mastery_id_2),
      purpose: getPurposeById(build.purpose_id),
    })
    .then(mostlyHydratedBuild => {
      return {
        id: build.id,
        charname: build.charname,
        guide: build.guide,
        author: build.author,
        link: build.link,
        blurb: build.blurb,
        image: build.image,
        ...mostlyHydratedBuild,
      }
    })

  const commonBuildFields = `
    id,
    charname,
    mastery_id_1,
    mastery_id_2,
    damage_type_id,
    play_style_id,
    game_version_id,
    gearreq_id,
    cruci_id,
    sr_level_id,
    guide,
    author,
    primary_skill_id,
    link,
    purpose_id,
    image,
    blurb
  `

  const getAllBuilds = () =>
    di.mariapool.query(`
      select
      ${commonBuildFields}
      from build
    `)
    .then(([rows]) => Bluebird.map(
      rows,
      hydrateBuildRow,
      { concurrency: 1 }
    ))

  const whereParamNullOrMatch = colName => `(? is null or ? = ${colName})`

  const getAllBuildsByCriteria = ({
    classCompoundCode,
    masteryCode,
    playStyleCode,
    purposeCode,
    damageTypeCode,
    srLevelCode,
    cruciCode,
    gearReqCode,
  }) => Bluebird.props({
    classCompoundCode0: classCompoundCode && classCompoundCode[0] && getMasteryByCode(classCompoundCode[0]),
    classCompoundCode1: classCompoundCode && classCompoundCode[1] && getMasteryByCode(classCompoundCode[1]),
    masteryId: masteryCode && getMasteryByCode(masteryCode),
    playStyleId: playStyleCode && getPlayStyleByCode(playStyleCode),
    purposeId: purposeCode && getPurposeByCode(purposeCode),
    damageTypeId: damageTypeCode && getDamageTypeByCode(damageTypeCode),
    srLevelId: srLevelCode && getSrLevelByCode(srLevelCode),
    cruciId: cruciCode && getCruciByCode(cruciCode),
    gearReqId: gearReqCode && getGearReqByCode(gearReqCode),
  })
  .then(({
    classCompoundId,
    masteryId,
    playStyleId,
    purposeId,
    damageTypeId,
    srLevelId,
    cruciId,
    gearReqId,
  }) => {
    return di.mariapool.query(`
      select
      ${commonBuildFields}
      from build
      where
        (? or (mastery_id_1 = ? and mastery_id_2 = ?)) and
        ${whereParamNullOrMatch('purpose_id')} and
        ${whereParamNullOrMatch('play_style_id')} and
        ${whereParamNullOrMatch('damage_type_id')} and
        ${whereParamNullOrMatch('sr_level_id')} and
        ${whereParamNullOrMatch('cruci_id')} and
        ${whereParamNullOrMatch('gearreq_id')} and
        (? is null or ? = mastery_id_1 or ? = mastery_id_2)
    `, [
      classCompoundId ? 0 : 1,
      classCompoundId && classCompoundId[0], classCompoundId && classCompoundId[1],
      playStyleId, playStyleId,
      purposeId, purposeId,
      damageTypeId, damageTypeId,
      srLevelId, srLevelId,
      cruciId, cruciId,
      gearReqId, gearReqId,
      masteryId, masteryId, masteryId
    ])
    .then(([rows]) => Bluebird.map(
      rows,
      hydrateBuildRow,
      { concurrency: 1 }
    ))
  })

  const insertBuild = (build) =>
    di.mariapool.query(`

      `)

  const getBuildById = id =>
    di.mariapool.query(`
      select
        id,
        charname,
        mastery_id_1,
        mastery_id_2,
        damage_type_id,
        play_style_id,
        game_version_id,
        gearreq_id,
        cruci_id,
        sr_level_id,
        guide,
        author,
        primary_skill_id,
        link,
        purpose_id,
        image,
        blurb
      from build
      where id = ?
    `, [id])
    .then(([[row]]) => {
      if (row) return hydrateBuildRow(row)
      throw new Error('build not found')
    })

  return {
    getMasteryById,
    getDamageTypeById,
    getPlaystyleById,
    getGameVersionById,
    getGearReqById,
    getCruciById,
    getSrLevelById,
    getPurposeById,
    getActiveSkillById,
    getActiveSkillsByBuildId,
    getPassiveSkillsByBuildId,
    getAllBuilds,
    getBuildById,
    getAllBuildsByCriteria,
  }
}
