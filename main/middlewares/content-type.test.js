const request = require('supertest')
const app = require('../config/app.js')
describe('Content-Type Middleware', () => {
  test('Should return json content-type as default', async () => {
    app.get('/test_content-type', (req, res) => {
      res.send({})
    })
    await request(app)
      .get('/test_content-type')
      .expect('content-type', /json/)
  })
})
