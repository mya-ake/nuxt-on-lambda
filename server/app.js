'use strict'

const express = require('express')

const { setHeadersMiddleware } = require('./middlewares/header-middleware')
const { nuxtMiddleware } = require('./middlewares/nuxt-middleware')

const app = express()

/** middleware */
app.use(setHeadersMiddleware)
app.use(nuxtMiddleware)

module.exports.app = app
