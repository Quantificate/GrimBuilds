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

  const getClassByCode = code => di.mariapool.query(
    `select mastery_id_1, mastery_id_2, code, label from character_class where code = ?`,
    [code]
  ).then(first)

  const makeGetByCodeFunc = tableName => code => di.mariapool.query(
    `select id, code, label from ${tableName} where code = ?`,
    [code]
  ).then(first)

  const getMasteryByCode = makeGetByCodeFunc('character_mastery')
  const getDamageTypeByCode = makeGetByCodeFunc('character_damage_type')
  const getPlayStyleByCode = makeGetByCodeFunc('character_play_style')
  const getGameVersionByCode = makeGetByCodeFunc('game_version')
  const getGearReqByCode = makeGetByCodeFunc('character_gearreq')
  const getCruciByCode = makeGetByCodeFunc('character_cruci')
  const getSrLevelByCode = makeGetByCodeFunc('character_sr_level')
  const getPurposeByCode = makeGetByCodeFunc('character_purpose')
  const getActiveSkillByCode = makeGetByCodeFunc('character_active_skill')
  const getPassiveSkillByCode = makeGetByCodeFunc('character_passive_skill')

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

  const getId = ({ id }) => id

  const getAllBuildsByCriteria = ({
    classCode,
    masteryCode,
    playStyleCode,
    purposeCode,
    damageTypeCode,
    srLevelCode,
    cruciCode,
    gearReqCode,
    limit,
  }) => Bluebird.props({
    classRow: classCode && getClassByCode(classCode),
    masteryId: masteryCode && getMasteryByCode(masteryCode).then(getId),
    playStyleId: playStyleCode && getPlayStyleByCode(playStyleCode).then(getId),
    purposeId: purposeCode && getPurposeByCode(purposeCode).then(getId),
    damageTypeId: damageTypeCode && getDamageTypeByCode(damageTypeCode).then(getId),
    srLevelId: srLevelCode && getSrLevelByCode(srLevelCode).then(getId),
    cruciId: cruciCode && getCruciByCode(cruciCode).then(getId),
    gearReqId: gearReqCode && getGearReqByCode(gearReqCode).then(getId),
    limit,
  })
  .then(({
    classRow,
    masteryId,
    playStyleId,
    purposeId,
    damageTypeId,
    srLevelId,
    cruciId,
    gearReqId,
    limit,
  }) => {
    let masteryId1FromClass = classRow && classRow.mastery_id_1
    let masteryId2FromClass = classRow && classRow.mastery_id_2
    if (masteryId1FromClass > masteryId2FromClass) {
      let temp = masteryId1FromClass
      masteryId1FromClass = masteryId2FromClass
      masteryId2FromClass = temp
    }

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
      limit ?
    `, [
      classRow ? 0 : 1,
      masteryId1FromClass, masteryId2FromClass,
      playStyleId, playStyleId,
      purposeId, purposeId,
      damageTypeId, damageTypeId,
      srLevelId, srLevelId,
      cruciId, cruciId,
      gearReqId, gearReqId,
      masteryId, masteryId, masteryId,
      limit
    ])
    .then(([rows]) => Bluebird.map(
      rows,
      hydrateBuildRow,
      { concurrency: 1 }
    ))
  })

  /* All fields are codes where applicable. Wrap us in a transaction when calling. */
  const insertBuild = ({
    charname,
    mastery1,
    mastery2,
    damageType,
    playStyle,
    gameVersion,
    gearReq,
    cruci,
    srLevel,
    guide,
    author,
    primarySkill,
    link,
    purpose,
    blurb,
    image,
    activeSkills,
    passiveSkills,
  }) => mariadb => Bluebird.props({
    charname,
    mastery1: getMasteryByCode(mastery1),
    mastery2: getMasteryByCode(mastery2),
    damageType: getDamageTypeByCode(damageType),
    playStyle: getPlayStyleByCode(playStyle),
    gameVersion: getGameVersionByCode(gameVersion),
    gearReq: getGearReqByCode(gearReq),
    cruci: getCruciByCode(cruci),
    srLevel: getSrLevelByCode(srLevel),
    guide,
    author,
    primarySkill: getActiveSkillByCode(primarySkill),
    link,
    purpose: getPurposeByCode(purpose),
    blurb,
    image,
    /* TODO make concurrency configurable */
    activeSkills: Bluebird.map(activeSkills, getActiveSkillByCode, { concurrency: 99 }),
    passiveSkills: Bluebird.map(passiveSkills, getPassiveSkillByCode, { concurrency: 99 }),
  })
  .then(({
    charname,
    mastery1,
    mastery2,
    damageType,
    playStyle,
    gameVersion,
    gearReq,
    cruci,
    srLevel,
    guide,
    author,
    primarySkill,
    link,
    purpose,
    blurb,
    image,
    activeSkills,
    passiveSkills,
  }) => {
    return mariadb.query(`
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
        blurb = ?,
        image = ?
    `, [
      charname,
      mastery1.id,
      mastery2.id,
      damageType.id,
      playStyle.id,
      gameVersion.id,
      gearReq.id,
      cruci.id,
      srLevel.id,
      JSON.stringify(guide),
      author,
      primarySkill.id,
      link,
      purpose.id,
      blurb,
      image
    ])
    .then(([{insertId: buildId}]) =>
      Bluebird.map(
        activeSkills,
        ({id}) => mariadb.query(
          'insert into build_character_active_skill set build_id=?, active_skill_id=?',
          [buildId, id]
        )
      )
      .then(() => Bluebird.map(
          passiveSkills,
          ({id}) => mariadb.query(
            'insert into build_character_passive_skill set build_id=?, passive_skill_id=?',
            [buildId, id]
          )
        )
      )
      .then(() => buildId)
    )
  })

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
    insertBuild,
  }
}
