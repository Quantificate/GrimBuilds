const debug = require('debug')('grimbuilds:backend:lib:sheets')

const masteries = {
  "Soldier": {
    "Demolitionist": "Commando",
    "Occultist": "Witchblade",
    "Nightblade": "Blademaster",
    "Arcanist": "Battlemage",
    "Shaman": "Warder",
    "Inquisitor": "Tactician",
    "Necromancer": "Death Knight",
    "Oathkeeper": "Warlord"
  },
  "Demolitionist": {
    "Occultist": "Pyromancer",
    "Nightblade": "Saboteur",
    "Arcanist": "Sorcerer",
    "Shaman": "Elementalist",
    "Inquisitor": "Purifier",
    "Necromancer": "Defiler",
    "Oathkeeper": "Shieldbreaker",
    "Soldier": "Commando"
  },
  "Occultist": {
    "Nightblade": "Witch Hunter",
    "Arcanist": "Warlock",
    "Shaman": "Conjurer",
    "Inquisitor": "Deceiver",
    "Necromancer": "Cabalist",
    "Oathkeeper": "Sentinel",
    "Soldier": "Witchblade",
    "Demolitionist": "Pyromancer"
  },
  "Nightblade": {
    "Arcanist": "Spellbreaker",
    "Shaman": "Trickster",
    "Inquisitor": "Infiltrator",
    "Necromancer": "Reaper",
    "Oathkeeper": "Dervish",
    "Soldier": "Blademaster",
    "Demolitionist": "Saboteur",
    "Occultist": "Witch Hunter"
  },
  "Arcanist": {
    "Shaman": "Druid",
    "Inquisitor": "Mage Hunter",
    "Necromancer": "Spellbinder",
    "Oathkeeper": "Templar",
    "Soldier": "Battlemage",
    "Demolitionist": "Sorcerer",
    "Nightblade": "Spellbreaker",
    "Occultist": "Warlock"
  },
  "Shaman": {
    "Inquisitor": "Vindicator",
    "Necromancer": "Ritualist",
    "Oathkeeper": "Archon",
    "Soldier": "Warder",
    "Demolitionist": "Elementalist",
    "Occultist": "Conjurer",
    "Nightblade": "Trickster",
    "Arcanist": "Druid"
  },
  "Inquisitor": {
    "Necromancer": "Apostate",
    "Oathkeeper": "Paladin",
    "Soldier": "Tactician",
    "Demolitionist": "Purifier",
    "Occultist": "Deceiver",
    "Nightblade": "Infiltrator",
    "Arcanist": "Mage Hunter",
    "Shaman": "Vindicator"
  },
  "Necromancer": {
    "Oathkeeper": "Oppressor",
    "Soldier": "Death Knight",
    "Demolitionist": "Defiler",
    "Occultist": "Cabalist",
    "Nightblade": "Reaper",
    "Arcanist": "Spellbinder",
    "Shaman": "Ritualist",
    "Inquisitor": "Apostate"
  },
  "Oathkeeper": {
    "Soldier": "Warlord",
    "Demolitionist": "Shieldbreaker",
    "Occultist": "Sentinel",
    "Nightblade": "Dervish",
    "Arcanist": "Templar",
    "Shaman": "Archon",
    "Inquisitor": "Paladin",
    "Necromancer": "Oppressor"
  }
}

const getClassFromMasteries = (mastery1, mastery2) => {
  debug(mastery1, mastery2)
  debug(masteries[mastery1])
  debug(masteries[mastery1][mastery2])
  return masteries[mastery1][mastery2]
}
module.exports.getClassFromMasteries = getClassFromMasteries
