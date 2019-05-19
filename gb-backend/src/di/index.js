const { createPool } = require('./maria')

function createContainer(config){
  const mariapool = createPool(config)
  return {
    mariapool
  }
}

module.exports.createContainer = createContainer
