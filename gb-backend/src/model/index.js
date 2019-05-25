const first = ([rows]) => rows[0]
const getRows = ([rows]) => rows

module.exports.makeModel = (config, di) => {

  const getMasteryById = id => di.mariabuild.query(
      'select id, code, label from character_mastery where id = ?',
      [id]
    ).then(first)

  const getDamageTypeById = id => di.mariabuild.query(
      'select id, code, label from character_damage_type where id = ?',
      [id]
    ).then(first)

  const getPlayStyleById = id => di.mariabuild.query(
      'select id, code, label from character_play_style where id = ?',
      [id]
    ).then(first)

  const getGameVersionById = id => di.mariabuild.query(
      'select id, code, label from game_version where id = ?',
      [id]
    ).then(first)

  const getGearReqById = id => di.mariabuild.query(
      'select id, code, label from character_gearreq where id = ?',
      [id]
    ).then(first)

  const getCruciById = id => di.mariabuild.query(
      'select id, code, label from character_cruci where id = ?',
      [id]
    ).then(first)

  const getSrLevelById = id => di.mariabuild.query(
      'select id, code, label from character_sr_level where id = ?',
      [id]
    ).then(first)

  const getPurposeById = id => di.mariabuild.query(
      'select id, code, label from character_purpose where id = ?',
      [id]
    ).then(first)

  const getActiveSkillById = id => di.mariabuild.query(`
        select
          id,
          code,
          label
        from character_active_skill
        where id = ?',
      [id]
    ).then(first)

  const getActiveSkillsByBuildId = id => di.mariabuild.query(`
        select
          cas.id,
          cas.code,
          cas.label
        from build_character_active_skill bcas
        join character_active_skill cas
          on cas.id = bcas.character_active_skill_id
        where
          bcas.build_id = ?
      `,
      [id]
    )
    .then(getRows)

  const getPassiveSkillsByBuildId = id => di.mariabuild.query(`
        select
          cps.id,
          cps.code,
          cps.label
        from build_character_passive_skill bcps
        join character_passive_skill cps
          on cps.id = bcps.character_passive_skill_id
        where
          bcps.build_id = ?
      `,
      [id]
    )
    .then(getRows)

  const hydrateBuildRow = async build => {
    await Bluebird.props(
      mastery1: getMasteryById(build.mastery_1_id),
      mastery2: getMasteryById(build.mastery_2_id),
      damageType: getDamageTypeById(build.damage_type_id),
      playStyle: getPlayStyleById(build.play_style_id),
      gameVersion: getGameVersionById(build.game_version_id),
      gearreq: getGearReqById(build.gearreq_id),
      cruci: getCruciById(build.cruci_id),
      srLevel: getSrLevelById(build.sr_level_id),
      activeSkills: getActiveSkillsByBuildId(build.id),
      passiveSkills: getPassiveSkillsByBuildId(build.id),
      primarySkill: getActiveSkillById(build.primarySkill),
    )
    .then(mostlyHydratedBuild => {
      return {
        id: build.id,
        charname: build.charname,
        guide: build.guide,
        author: build.author,
        link: build.link,
        blurb: build.blurb,
        ...mostlyHydratedBuild,
      }
    })
  }

  const getAllBuilds = di =>
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
        blurb
      from build
    `)
    .then(([rows]) => Bluebird.map(
      rows,
      hydrateBuildRow,
      { concurrency: 1 }
    ))

  return {
    getMasteryById,
    getDamageTypeById,
    getPlayStyleById,
    getGameVersionById,
    getGearReqById,
    getCruciById,
    getSrLevelById,
    getPurposeById,
    getActiveSkillById,
    getActiveSkillsByBuildId,
    getPassiveSkillsByBuildId,
    getAllBuilds,
  }
}
