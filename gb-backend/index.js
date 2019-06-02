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

/* TODO find a home for this function */
const maybeMin = (maybe, min) => maybe === null ? Math.min(maybe, min) : min

app.post('/api/builds/search', (req, res, next) => {
  const buildFilterCriteria = {
    ...req.body,
    limit: maybeMin(req.body.limit, config.app.MAX_BUILDS_SEARCH_RESULTS)
  }
  model.getAllBuildsByCriteria(buildFilterCriteria)
  .then(builds => res.send(builds))
  .catch(next)
})

app.post('/api/builds', (req, res, next) => {
  /* TODO validate request body */
  container.mariapool.transact(
    model.insertBuild(req.body)
  )
  .then (buildId => {
    res.send({ success: true, buildId })
  })
  .catch(next)
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
  console.error('fatal request handler error:')
  console.error(err)
  res.status(500).send({
    success: false,
    err: err.message
  })
})
