const express = require('express')

const { nuxt } = require('./core/nuxt')
const { setHeadersMiddleware } = require('./middlewares/header-middleware')
const { loggerMiddleware } = require('./middlewares/logger-middleware')
const { envMiddleware } = require('./middlewares/env-middleware')

const app = express()

/** middleware */
app.use(setHeadersMiddleware)

if (process.env.ENDPOINT_ENV === 'api_gw') {
  app.use(envMiddleware)
}

app.use(loggerMiddleware)
app.use(nuxt.render)

module.exports.app = app
