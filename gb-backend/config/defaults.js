module.exports = {
  database: {
    maria: {
      user: "grimbuilds",
      host: "localhost",
      database: "grimbuilds",
      port: 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    }
  },
  HTTPserver: {
    port: 5000
  },
  latestGameVersion: "1.1.2.4"
}
