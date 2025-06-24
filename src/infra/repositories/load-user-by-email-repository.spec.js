const { MongoMemoryServer } = require('mongodb-memory-server')
const { MongoClient } = require('mongodb')

let mongoServer
let client
let db

class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    return await this.userModel.findOne({
      email
    }, {
      projection: {
        password: 1
      }
    })
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return {
    userModel,
    sut
  }
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()

    client = await MongoClient.connect(uri)
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
    const { sut } = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('Should return a user if user is found', async () => {
    const { sut, userModel } = makeSut()

    const fakeUserData = {
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    }

    await userModel.insertOne(fakeUserData)

    const user = await sut.load('valid_email@mail.com')

    expect(user).toMatchObject({
      password: 'hashed_password'
    })
    expect(user._id).toBeDefined()
  })
})
