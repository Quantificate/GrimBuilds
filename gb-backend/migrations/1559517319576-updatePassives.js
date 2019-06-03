'use strict'
const config = require('../config')
const { createContainer } = require('../src/di')

const container = createContainer(config)

module.exports.up = function (next) {
  container.mariapool.query(`
    insert into character_passive_skill (code, label) values
      ("decorated-soldier","Decorated Soldier"),
      ("fighting-spirit","Fighting Spirit"),
      ("markovian-s-advantage","Markovian's Advantage"),
      ("menhir-s-will","Menhir's Will"),
      ("military-conditioning","Military Conditioning"),
      ("scars-of-battle","Scars of Battle"),
      ("shield-training","Shield Training"),
      ("veterancy","Veterancy"),
      ("zolhan-s-technique","Zolhan's Technique"),
      ("counter-strike","Counter Strike"),
      ("field-command","Field Command"),
      ("menhir-s-bulwark","Menhir's Bulwark"),
      ("oleron-s-rage","Oleron's Rage"),
      ("blast-shield","Blast Shield"),
      ("ulzuin-s-chosen","Ulzuin's Chosen"),
      ("flame-touched","Flame Touched"),
      ("vindictive-flame","Vindictive Flame"),
      ("bonds-of-bysmiel","Bonds of Bysmiel"),
      ("possession","Possession"),
      ("solael-s-witchfire","Solael's Witchfire"),
      ("anatomy-of-murder","Anatomy of Murder"),
      ("dual-blades","Dual Blades"),
      ("belgothian-s-shears","Belgothian's Shears"),
      ("amarasta-s-quick-cut","Amarasta's Quick Cut"),
      ("whirling-death","Whirling Death"),
      ("execution","Execution"),
      ("merciless-repertoire","Merciless Repertoire"),
      ("phantasmal-armor","Phantasmal Armor"),
      ("veil-of-shadow","Veil of Shadow"),
      ("arcane-will","Arcane Will"),
      ("fabric-of-reality","Fabric of Reality"),
      ("inner-focus","Inner Focus"),
      ("mental-alacrity","Mental Alacrity"),
      ("iskandra-s-elemental-exchange","Iskandra's Elemental Exchange"),
      ("reckless-power","Reckless Power"),
      ("star-pact","Star Pact"),
      ("mogdrogen-s-pact", "Mogdrogen's Pact"),
      ("primal-bond", "Primal Bond"),
      ("stormcaller-s-pact", "Stormcaller's Pact"),
      ("artifact-handling", "Artifact Handling"),
      ("bursting-round", "Bursting Round"),
      ("chilling-rounds", "Chilling Rounds"),
      ("deadly-aim", "Deadly Aim"),
      ("ranged-expertise", "Ranged Expertise"),
      ("storm-spread", "Storm Spread"),
      ("aura-of-censure", "Aura of Censure"),
      ("aura-of-conviction", "Aura of Conviction"),
      ("necrotic-edge", "Necrotic Edge"),
      ("reaping-strike", "Reaping Strike"),
      ("harbinger-of-souls", "Harbinger of Souls"),
      ("master-of-death", "Master of Death"),
      ("spectral-binding", "Spectral Binding"),
      ("rebuke", "Rebuke"),
      ("safeguard", "Safeguard"),
      ("shattering-smash", "Shattering Smash"),
      ("smite", "Smite"),
      ("divine-mandate", "Divine Mandate"),
      ("path-of-the-three", "Path of the Three"),
      ("presence-of-virtue", "Presence of Virtue")
      on duplicate key update label=values(label)
    `)
    .then(() => next())
    .catch(next)
}

module.exports.down = function (next) {
  /* not all migrations can be undone. do nothing. */
  next()
}
