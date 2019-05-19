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
    "Oathkeeper": "Shieldbreaker"
  },
  "Occultist": {
    "Nightblade": "Witch Hunter",
    "Arcanist": "Warlock",
    "Shaman": "Conjurer",
    "Inquisitor": "Deceiver",
    "Necromancer": "Cabalist",
    "Oathkeeper": "Sentinel"
  },
  "Nightblade": {
    "Arcanist": "Spellbreaker",
    "Shaman": "Trickster",
    "Inquisitor": "Infiltrator",
    "Necromancer": "Reaper",
    "Oathkeeper": "Dervish"
  },
  "Arcanist": {
    "Shaman": "Druid",
    "Inquisitor": "Mage Hunter",
    "Necromancer": "Spellbinder",
    "Oathkeeper": "Templar"
  },
  "Shaman": {
    "Inquisitor": "Vindicator",
    "Necromancer": "Ritualist",
    "Oathkeeper": "Archon"
  },
  "Inquisitor": {
    "Necromancer": "Apostate",
    "Oathkeeper": "Paladin"
  },
  "Necromancer": {
    "Oathkeeper": "Oppressor"
  }
}

const getClassFromMasteries = (mastery1, mastery2) => {
  console.log(mastery1, mastery2)
  console.log(masteries[mastery1])
  console.log(masteries[mastery1][mastery2])
  return masteries[mastery1][mastery2]
}
module.exports.getClassFromMasteries = getClassFromMasteries
