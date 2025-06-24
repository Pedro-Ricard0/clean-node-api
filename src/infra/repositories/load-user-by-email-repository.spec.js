const { MongoMemoryServer } = require('mongodb-memory-server')
const { MongoClient } = require('mongodb')
class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    return await this.userModel.findOne({ email })
  }
}

describe('LoadUserByEmail Repository', () => {
  let mongoServer
  let client
  let db

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()

    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    db = client.db()
  })

  afterAll(async () => {
    await client.close()
    await mongoServer.stop()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany({})
  })

  test('Should return null if no user is found', async () => {
    const userModel = db.collection('users')
    const sut = new LoadUserByEmailRepository(userModel)
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('Should return a user if user is found', async () => {
    const userModel = db.collection('users')
    await userModel.insertOne({ email: 'valid_email@mail.com' })
    const sut = new LoadUserByEmailRepository(userModel)
    const user = await sut.load('valid_email@mail.com')
    expect(user.email).toBe('valid_email@mail.com')
  })
})
