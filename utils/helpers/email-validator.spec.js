const MissingParamError = require('../errors/missing-param-error')
const EmailValidator = require('./email-validator')
const validator = require('validator')
const makeSut = () => {
  return new EmailValidator()
}
describe('Email Validator', () => {
  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })
  test('Should return false if validator return false', () => {
    validator.isEmailValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValid('invalid_email@mail.com')
    expect(isEmailValid).toBe(false)
  })
  test('Should call validator with correct email', () => {
    const sut = makeSut()
    sut.isValid('any_email@mail.com')
    expect(validator.email).toBe('any_email@mail.com')
  })
  test('Should throw if no email is provided', async () => {
    const sut = makeSut()
    sut.isValid('any_email@mail.com')
    expect(sut.isValid).toThrow(new MissingParamError('email'))
  })
})
