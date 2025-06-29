const MongoHelper = require('../helpers/mongo-helper.js')

class UpdateAcessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, acessToken) {
    await this.userModel.updateOne(
      { _id: userId },
      { $set: { acessToken } }
    )
  }
}

describe('UpdateAcessToken Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clearCollection('users')
  })

  test('Should update the user with the given acessToken', async () => {
    const userModel = MongoHelper.getCollection('users')
    const sut = new UpdateAcessTokenRepository(userModel)

    const result = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })

    const fakeUserId = result.insertedId

    await sut.update(fakeUserId, 'valid_token')

    const updatedUser = await userModel.findOne({ _id: fakeUserId })

    expect(updatedUser.acessToken).toBe('valid_token')
  })

  test('Should throw if no userModel is provided', async () => {
    const sut = new UpdateAcessTokenRepository()
    const userModel = MongoHelper.getCollection('users')
    const result = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    const promise = sut.update(result.insertedId, 'valid_token')
    await expect(promise).rejects.toThrow()
  })
})
