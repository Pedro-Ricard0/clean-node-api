const MongoHelper = require('../helpers/mongo-helper.js')
const MissingParamError = require('../../../utils/errors/missing-param-error.js')
class UpdateAcessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, acessToken) {
    if (!userId) throw new MissingParamError('userId')
    if (!acessToken) throw new MissingParamError('acessToken')
    await this.userModel.updateOne(
      { _id: userId },
      { $set: { acessToken } }
    )
  }
}

const makeSut = async () => {
  const userModel = MongoHelper.getCollection('users')
  const sut = new UpdateAcessTokenRepository(userModel)
  return {
    sut,
    userModel
  }
}

describe('UpdateAcessToken Repository', () => {
  let userModel
  let fakeUserId

  beforeAll(async () => {
    await MongoHelper.connect()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clearCollection('users')
    userModel = MongoHelper.getCollection('users')
    const result = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })

    fakeUserId = result.insertedId
  })

  test('Should update the user with the given acessToken', async () => {
    const { sut, userModel } = await makeSut()

    await sut.update(fakeUserId, 'valid_token')

    const updatedUser = await userModel.findOne({ _id: fakeUserId })

    expect(updatedUser.acessToken).toBe('valid_token')
  })

  test('Should throw if no userModel is provided', async () => {
    const sut = new UpdateAcessTokenRepository()
    const promise = sut.update(fakeUserId, 'valid_token')
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if no params is provided', async () => {
    const { sut } = await makeSut()

    const promise1 = sut.update()
    expect(promise1).rejects.toThrow(new MissingParamError('userId'))

    const promise2 = sut.update('any_id')
    expect(promise2).rejects.toThrow(new MissingParamError('acessToken'))
  })
})
