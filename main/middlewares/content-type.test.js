const request = require('supertest')
const express = require('express')
const setupApp = require('../config/setup')

describe('Content-Type Middleware', () => {
  test('Should return json content-type as default', async () => {
    const app = express()
    setupApp(app)

    app.get('/test_content_type', (req, res) => {
      res.send({})
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  test('Should return xml content-type if forced', async () => {
    const app = express()
    setupApp(app)

    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('<note><to>Pedro</to></note>')
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
