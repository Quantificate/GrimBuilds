'use strict'
const config = require('../config')
const { createContainer } = require('../src/di')

const container = createContainer(config)

module.exports.up = function (next) {
  container.mariapool.query(`
    insert into character_class (mastery_id_1, mastery_id_2, code, label) values
    ("1", "9", "elementalist", "Elementalist"),
    ("3", "4", "warlock", "Warlock"),
    ("3", "5", "mage-hunter", "Mage Hunter"),
    ("3", "7", "spellbreaker", "Spellbreaker"),
    ("3", "9", "sorcerer", "Sorcerer"),
    ("4", "8", "witchblade", "Witch Blade"),
    ("5", "8", "tactician", "Tactician"),
    ("6", "7", "reaper", "Reaper"),
    ("6", "9", "defiler", "Defiler"),
    ("7", "9", "saboteur", "Saboteur")
    on duplicate key update label=values(label)
  `)
  .then(() => next())
  .catch(next)
}

module.exports.down = function (next) {
  container.mariapool.query(`
    delete from character_class where
    code = "elementalist" or
    code = "warlock" or
    code = "mage-hunter" or
    code = "spellbreaker" or
    code = "sorcerer" or
    code = "witchblade" or
    code = "tactician" or
    code = "reaper" or
    code = "defiler" or
    code = "saboteur"
  `)
  .then(() => next())
  .catch(next)
}
