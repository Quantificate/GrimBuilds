const csvParser = require('csv-parser')
const Bluebird = require('bluebird')
const config = require('../config')
const { createContainer } = require('../src/di')
const fs = require('fs')

const container = createContainer(config)

/* Using streams, parse a CSV. Resolve a promise upon completion. */
const parseCsvPromise = filename => new Promise((resolve, reject) => {
  const rows = []
  fs.createReadStream(filename)
  .pipe(csvParser())
  .on('data', data => rows.push(data))
  .on('end', () => resolve(rows))
  .on('err', err => reject(err))
})

const usage = () => {
  console.log('please specify a filename')
  process.exit(1)
}

const filename = process.argv[2]
if (!filename)
  usage()

/* TODO maybe all rows inserted should succeed or fail together (transaction)
 * allowing for rather than partial insert success */
parseCsvPromise(filename)
.then(rows => Bluebird.map(
  rows,
  row => container.mariapool.query(`
      insert into builds set
        charname=?,
        class=?,
        mastery1=?,
        mastery2=?,
        damagetype=?,
        activeskills=?,
        passiveskills=?,
        playstyle=?,
        version=?,
        gearreq=?,
        cruci=?,
        srlevel=?,
        guide=?,
        author=?,
        primaryskill=?,
        link=?,
        purpose=?,
        blurb=?
    `, [
      row.charname,
      row.class,
      row.mastery1,
      row.mastery2,
      row.damagetype,
      row.activeskills,
      row.passiveskills,
      row.playstyle,
      row.version,
      row.gearreq,
      row.cruci,
      row.srlevel,
      row.guide,
      row.author,
      row.primaryskill,
      row.link,
      row.purpose,
      row.blurb,
    ],
  { concurrency: 1 }
  )
))
.then(() => {
  console.log('done')
  process.exit()
})
.catch(err => {
  console.error('error', err)
  process.exit(1)
})

