const { MongoMemoryServer } = require('mongodb-memory-server')
const { MongoClient } = require('mongodb')

let client, db, mongoServer

module.exports = {
  async connect () {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    client = await MongoClient.connect(uri)
    db = client.db()
  },

  async disconnect () {
    await client.close()
    await mongoServer.stop()
  },

  async clearCollection (name) {
    return db.collection(name).deleteMany({})
  },

  getDb () {
    return db
  },

  getClient () {
    return client
  },

  getCollection (name) {
    return db.collection(name)
  }
}
