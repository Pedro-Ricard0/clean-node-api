const mongoHelper = require('./mongo-helper')

describe('Mongo Helper', () => {
  test('Should reconnect when getDB is invoked and client is disconnected', async () => {
    const sut = mongoHelper
    await sut.connect()
    await sut.disconnect()

    const db1 = await sut.getDb()
    expect(db1).toBeTruthy()

    await sut.disconnect()

    const db2 = await sut.getDb()
    expect(db2).toBeTruthy()
  })
})
