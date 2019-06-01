const express = require('express');
const jsonf = require('jsonfile');
const config = require('./config')
const bodyParser = require('body-parser')
const { makeModel } = require('./src/model')
const container = require('./src/di').createContainer(config)
const { getClassFromMasteries } = require('./src/lib/sheets')
const app = express();
const port = config.HTTPserver.port;

app.use(bodyParser.json())

app.listen(port, () => console.log(`Now listening on P ${port}`));

const model = makeModel(config, container)

app.get('/api/builds-all', (req, res, next) => {
  model.getAllBuilds()
    .then (resdb =>
      res.send(resdb)
    )
    .catch (err => {
      next(err);
    })
})

app.get('/api/guide/:buildId', (req, res, next) => {
  const {buildId} = req.params
  model.getBuildById(buildId)
    .then(build => res.send(build))
    .catch (err => {
      next(err);
    })
})

app.post('/api/builds/search', (req, res, next) => {
  console.log('got search body=', req.body)
  return model.getAllBuildsByCriteria(req.body)
  .then(builds => res.send(builds))
  .catch(next)
})

app.post('/api/builds', (req, res, next) => {
  //TODO: Validate form data
  const guide = JSON.stringify(req.body.guide)
  const charclass = getClassFromMasteries(req.body.mastery1, req.body.mastery2); //TODO: Fix error: mastery1 is undefined.
  container.mariapool.query(`INSERT INTO build SET
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
    image=?,
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
      guide,
      req.body.author,
      req.body.primaryskill,
      req.body.link,
      req.body.purpose,
      req.body.image,
      req.body.blurb
    ])
    .then (resin => {
      res.send({ success: true })
    })
    .catch (err => {
      next(err);
    })
})

app.post('/api/likes', (req, res, next) => {
  console.log(req.body, req.body.id)
  const buildid=req.body.id;
  console.log(buildid)
  container.mariapool.query(`UPDATE builds SET likes=likes+1 WHERE id=` + buildid)
  .then (resin2 => {
    res.send({ clicked: true })
  })
  .catch (err => {
    next(err);
  })
})

app.use((err, req, res, next) => {
  /* TODO handle not found error differently */
  res.status(500).send({
    success: false,
    err: err.message
  })
})
