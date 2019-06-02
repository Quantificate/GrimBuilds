const mysql = require('mysql2');

function createPool(config){
  const pool = mysql.createPool({
    host: config.database.maria.host,
    user: config.database.maria.user,
    port: config.database.maria.port,
    password: config.database.maria.password,
    database: config.database.maria.database,
    waitForConnections: config.database.maria.waitForConnections,
    connectionLimit: config.database.maria.connectionLimit,
    queueLimit: config.database.maria.queueLimit,
  }).promise()

  pool.lease = fn =>
    pool.getConnection()
      .then(conn => {
        return fn(conn)
        .finally(() => conn.release())
      })

  pool.transact = fn =>
    pool.lease(
      conn => conn.beginTransaction()
      .then(() => fn(conn))
      .then(
        rval => conn.commit()
          .then(() => rval),
        err => {
          conn.rollback()
          throw err
        }
      )
    )

  return pool
}

//workaround for open issue https://github.com/mysqljs/mysql/issues/1507

function authSwitchHandler({pluginName}, cb) {
  if (pluginName === 'auth_socket'){
    cb(null, Buffer.alloc(0));
  } else {
    cb(new Error("Unsupported auth plugin"));
  }
}

module.exports.createPool = createPool
