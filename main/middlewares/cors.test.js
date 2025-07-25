const request = require('supertest')
const app = require('../config/app.js')
describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send('')
    })
    const res = await request(app).get('/test_cors')
    expect(res.headers['acess-control-allow-origin']).toBe('*')
    expect(res.headers['acess-control-allow-methods']).toBe('*')
    expect(res.headers['acess-control-allow-headers']).toBe('*')
  })
})
