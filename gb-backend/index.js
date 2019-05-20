const express = require('express');
const jsonf = require('jsonfile');
const config = require('./config')
const bodyParser = require('body-parser')
const container = require('./src/di').createContainer(config)
const { getClassFromMasteries } = require('./src/lib/sheets')
const app = express();
const port = config.HTTPserver.port;

app.use(bodyParser.json())

app.listen(port, () => console.log(`Now listening on P ${port}`));

app.get('/api/builds-all', (req, res, next) => {
  container.mariapool.query(`SELECT
    id,
    charname,
    class,
    mastery1,
    mastery2,
    damagetype,
    activeskills,
    passiveskills,
    playstyle,
    version,
    gearreq,
    cruci,
    srlevel,
    guide,
    author,
    primaryskill,
    link,
    purpose,
    blurb
    FROM builds`)
    .then (resdb => {
      res.send(resdb[0])
    })
    .catch (err => {
      next(err);
    })
})

app.post('/api/builds', (req, res, next) => {
  //TODO: Validate form data
  const charclass = getClassFromMasteries(req.body.mastery1, req.body.mastery2); //TODO: Fix error: mastery1 is undefined.
  container.mariapool.query(`INSERT INTO builds SET
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
      req.body.charname,
      charclass,
      req.body.mastery1,
      req.body.mastery2,
      req.body.damage,
      req.body.activeskills,
      req.body.passiveskills,
      req.body.style,
      config.latestGameVersion,
      req.body.gear,
      req.body.cruci,
      req.body.sr,
      req.body.guide,
      req.body.author,
      req.body.primaryskill,
      req.body.link,
      req.body.purpose,
      req.body.blurb
    ])
    .then (resin => {
      res.send({ success: true })
    })
    .catch (err => {
      next(err);
    })
})
