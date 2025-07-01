const jsonParser = require('../middlewares/json-parser.js')
const contentType = require('../middlewares/content-type.js')
const cors = require('../middlewares/cors.js')
module.exports = (app) => {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(jsonParser)
  app.use(contentType)
}
