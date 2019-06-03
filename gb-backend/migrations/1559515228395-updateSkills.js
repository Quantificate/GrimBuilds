'use strict'
const config = require('../config')
const { createContainer } = require('../src/di')

const container = createContainer(config)

module.exports.up = function (next) {
  container.mariapool.query(`
    replace into character_active_skill (code, label) values
      ("blade-arc", "Blade Arc"),
      ("blitz", "Blitz"),
      ("cadence", "Cadence"),
      ("forcewave", "Forcewave"),
      ("overguard", "Overguard"),
      ("war-cry", "War Cry"),
      ("blackwater-cocktail", "Blackwater Cocktail"),
      ("canister-bomb", "Canister Bomb"),
      ("fire-strike", "Fire Strike"),
      ("flashbang", "Flashbang"),
      ("grenado", "Grenado"),
      ("mortar-trap", "Mortar Trap"),
      ("stun-jacks", "Stun Jacks"),
      ("thermite-mine", "Thermite Mine"),
      ("blood-of-dreeg", "Blood of Dreeg"),
      ("bloody-pox", "Bloody Pox"),
      ("curse-of-frailty", "Curse of Frailty"),
      ("doom-bolt", "Doom Bolt"),
      ("dreeg-s-evil-eye", "Dreeg's Evil Eye"),
      ("sigil-of-consumption", "Sigil of Consumption"),
      ("summon-familiar", "Summon Familiar"),
      ("summon-hellhound", "Summon Hellhound"),
      ("amarasta-s-blade-burst", "Amarasta's Blade Burst"),
      ("blade-barrier", "Blade Barrier"),
      ("blade-trap", "Blade Trap"),
      ("phantasmal-blades", "Phantasmal Blades"),
      ("pneumatic-burst", "Pneumatic Burst"),
      ("ring-of-steel", "Ring of Steel"),
      ("shadow-strike", "Shadow Strike"),
      ("blade-spirit", "Blade Spirit"),
      ("albrecht-s-aether-ray", "Albrecht's Aether Ray"),
      ("callidor-s-tempest", "Callidor's Tempest"),
      ("devastation", "Devastation"),
      ("maiven-s-sphere-of-protection", "Maiven's Sphere of Protection"),
      ("mirror-of-ereoctes", "Mirror of Ereoctes"),
      ("nullification", "Nullification"),
      ("olexra-s-flash-freeze", "Olexra's Flash Freeze"),
      ("panetti-s-replicating-missile", "Panetti's Replicating Missile"),
      ("trozan-s-sky-shard", "Trozan's Sky Shard"),
      ("devouring-swarm", "Devouring Swarm"),
      ("grasping-vines", "Grasping Vines"),
      ("primal-strike", "Primal Strike"),
      ("savagery", "Savagery"),
      ("flames-of-ignaffar", "Flames of Ignaffar"),
      ("horn-of-gandarr", "Horn of Gandarr"),
      ("inquisitor-seal", "Inquisitor Seal"),
      ("rune-of-hagarrad", "Rune of Hagarrad"),
      ("rune-of-kalastor", "Rune of Kalastor"),
      ("storm-box-of-elgoloth", "Storm Box of Elgoloth"),
      ("word-of-pain", "Word of Pain"),
      ("word-of-renewal", "Word of Renewal"),
      ("bone-harvest", "Bone Harvest"),
      ("call-of-the-grave", "Call of the Grave"),
      ("drain-essence", "Drain Essence"),
      ("ill-omen", "Ill Omen"),
      ("mark-of-torment", "Mark of Torment"),
      ("ravenous-earth", "Ravenous Earth"),
      ("reap-spirit", "Reap Spirit"),
      ("siphon-souls", "Siphon Souls"),
      ("raise-skeleton", "Raise Skeleton"),
      ("summon-blight-fiend", "Summon Blight Fiend"),
      ("aegis-of-menhir", "Aegis of Menhir"),
      ("ascension", "Ascension"),
      ("eye-of-reckoning", "Eye of Reckoning"),
      ("judgment", "Judgment"),
      ("righteous-fervor", "Righteous Fervor"),
      ("vire-s-might", "Vire's Might"),
      ("summon-guardian-of-empyrion", "Summon Guardian of Empyrion"),
      ("conjure-primal-spirit","Conjure Primal Spirit"),
      ("storm-totem","Storm Totem"),
      ("summon-briarthorn","Summon Briarthorn"),
      ("wendigo-totem","Wendigo Totem"),
      ("wind-devil","Wind Devil")
    `)
  .then(() => next())
  .catch(next)
}

module.exports.down = function (next) {
  return container.mariapool.query(`
    delete from character_active_skill where id > 129
    `)
  .then(() => next())
  .catch(next)
}
